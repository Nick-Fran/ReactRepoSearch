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

function Search() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const MaxElementsPerPage = 5;

  //get params from url
  let { q } = useParams();

  const fetchData = useCallback(
    () => {
      setLoading(true);
      
      let url = `https://dummyjson.com/products`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
          //console.log("Data retrieved is:", data)
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(true);
        });
    },
    [page, q]
  );

  const handleSubmit = (input) => {
    setPage(1);
    fetchData();
  };

  const handlePagination = (direction) => {
    let offset = page * 31;
    let results = data.limit;
    if (direction === "prev" && page >= 2) {
      setPage(page - 1);
    }
    if (direction === "next" && page > 0 && offset < results) {
      setPage(page + 1);
    }
  };

  useEffect(
    () => {
      fetchData();
    },
    [q, page, fetchData]
  );

  return (
    <Container id="Search">
      <Header>
        <IconLink to={`/`}>
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
              />
              <Pagination>
                <Icon onClick={() => handlePagination("prev")}>
                  <LeftIcon />
                  Prev
                </Icon>
                Page {page}
                <Icon onClick={() => handlePagination("next")}>
                  Next
                  <RightIcon />
                </Icon>
              </Pagination>
            </>
          ) : null}
        </List>
      </ResultsWrapper>
      {error ? <Redirect to="/error" /> : null}
    </Container>
  );
}

export default withRouter(Search);
