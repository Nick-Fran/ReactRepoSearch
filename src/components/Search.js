import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { Spinner } from "react-spinners-css";
import { withRouter, Link, useParams, Redirect } from "react-router-dom";
import { GoHome } from "react-icons/go";
import {
  GoChevronLeft as LeftIcon,
  GoChevronRight as RightIcon,
} from "react-icons/go";
import { DivFlexCenter } from "../globals/styles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: space-between;
    background-color: ${theme.colors.secondary};
    padding: 1rem;
    color: ${theme.colors.primary};
  `}
`;

const Icon = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    padding: 0.25rem;
    color: ${theme.colors.secondary};
    cursor: pointer;

    &:hover {
      border-radius: 10px;
      padding: 0.25rem;
      border: 1px solid ${theme.colors.secondary};
    }
  `}
`;

const IconLink = styled(Link)`
  ${({ theme }) => css`
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: ${theme.colors.primary};
  `}
`;

const ResultsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  font-size: 0.8rem;
`;

const TotalResults = styled.div`
  ${({ theme }) => css`
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: left;
  `}
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Loading = styled(DivFlexCenter)`
  height: 50vh;
  top: 25%;
  left: 50%;
`;

const Pagination = styled(DivFlexCenter)`
  gap: 2rem;
  padding: 1rem;
  font-size: 0.8rem;
`;

let param = "";

function Search() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [queryParam, setQueryParam] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  const MaxElementsPerPage = 5;
  const MaxNumOfPages = Math.ceil(data?.limit / MaxElementsPerPage);

  //get params from url
  let { q } = useParams();

  const fetchData = useCallback(
    () => {
      setLoading(true);
      setQueryParam(param)
      //console.log("Search|fetchData|q retrieved is:", q)

      let url = `https://dummyjson.com/products`;

      if(param){
        //console.log("Search|fetchData|param value:", param);
        url = `https://dummyjson.com/products/search?q=` + encodeURIComponent(param);
      }

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
          //console.log("Search|fetchData|Data retrieved is:", data)
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(true);
        });
    },
    [page, q]
  );

  const handleHomeButton = () => {
    //console.log("Search|handleHomeButton");
    param = ""
    setPage(1);
    setCurrentIndex(0);
    fetchData();
  }

  const handleSubmit = (input) => {
    setPage(1);
    setCurrentIndex(0);
    //console.log("Search|handleSubmit|input is:", input);
    if(input){
      param = input;
    }else{
      param = ""
    }
  };

  const handlePagination = (direction) => {
    let offset = page * 31;
    let results = data.limit;
    let newPage;
    if (direction === "prev" && page >= 2) {
      newPage = page - 1
    }
    else if (direction === "next" && page < MaxNumOfPages) {
      newPage = page + 1
    }
    setPage(newPage);
    setCurrentIndex((newPage - 1) * MaxElementsPerPage);
  };

  const PrevPageButton = page > 1 ?
    (<Icon onClick={() => handlePagination("prev")}>
      <LeftIcon />
      Prev
    </Icon>) : null;

  const NextPageButton = page < MaxNumOfPages ?
    (<Icon onClick={() => handlePagination("next")}>
      Next
      <RightIcon />
    </Icon>) : null;

  const PaginationElement = data?.limit > 0 ?
    (<Pagination>
      {PrevPageButton}
      Page {page} of {MaxNumOfPages}
      {NextPageButton}
    </Pagination>) : null;

  useEffect(
    () => {
      fetchData();
    },
    [q, page, fetchData]
  );

  return (
    <Container id="Search">
      <Header>
        <IconLink to={`/`} onClick={handleHomeButton}>
          <GoHome />
        </IconLink>
        <SearchBar placeholder="Search..." onSubmit={handleSubmit} value={q} />
      </Header>
      <ResultsWrapper>
        <List>
          <TotalResults>
            {data? data.limit : 0}{" "}results
          </TotalResults>

          {loading ? (
            <Loading>
              <Spinner color={`#cf9fff`} />
            </Loading>
          ) : data ? (
            <>
              <SearchResults
                fetchData={fetchData}
                data={data}
                currentIndex={currentIndex}
                page={page}
                MaxElementsPerPage={MaxElementsPerPage}
              />
              {PaginationElement}
            </>
          ) : null}
        </List>
      </ResultsWrapper>
      {error ? <Redirect to="/error" /> : null}
    </Container>
  );
}

export default withRouter(Search);