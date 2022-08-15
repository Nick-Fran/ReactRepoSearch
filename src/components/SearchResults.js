import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";

const Results = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.div``;

const StyledLink = styled(Link)`
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  color: #0d4436;

  &:hover {
    text-decoration: underline;
  }
`;
const Repo = styled.div`
  padding: 1rem 0 1rem 0;
  border-bottom: 1px solid black;
`;

const Description = styled.div`
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Price = styled.div`
  font-size: 1.1rem;
`;

function SearchResults({ data }) {
  return (
    <Results>
      <List>
        {(data?.products || []).map(
          (item) => {
            return (
              <Repo key={item.id}>
                <StyledLink
                  to={{
                    pathname: `/info/${item.id}`,
                    state: { item: item },
                  }}
                >
                {item.title}
                </StyledLink>
                <Description>{item.description}</Description>
                <Price>R$ {item.price} ({item.stock} available)</Price>
              </Repo>
            );
          }
        )}
      </List>
    </Results>
  );
}

export default withRouter(SearchResults);
