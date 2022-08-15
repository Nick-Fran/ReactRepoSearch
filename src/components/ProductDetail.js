import React from "react";
import styled, { css } from "styled-components";
import { DivFlexCenter } from "../globals/styles";
import { BiArrowBack } from "react-icons/bi";
import {
  GoStar as StarIcon,
  GoRepoForked as ForkIcon,
  GoEye as WatchIcon,
  GoGist as LanguageIcon,
  GoPerson as UserIcon,
  GoIssueOpened as IssuesIcon,
  GoWatch as UpdatedIcon,
  GoFile as LicenseIcon,
  GoLock as VisibilityIcon,
  // GoRepo as RepoIcon,
  // GoBook as DescriptionIcon,
} from "react-icons/go";
import {
  useLocation,
  useHistory,
  withRouter,
  Redirect,
} from "react-router-dom";

const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    margin: 0;
  `}
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 2rem;
  margin: auto;
  gap: 1rem;
  width: 75%;
`;

const NameLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 1.25rem;
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 1rem;
`;

const Square = styled.div`
  height: 200px;
`;

const Image = styled.img`
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-height: 100%;
  max-width: 100%;
`;

const Buttons = styled(DivFlexCenter)``;

const BackButton = styled.div`
  ${({ theme }) => css`
    width: 10rem;
    border: 2px solid ${theme.colors.secondary};
    border-radius: 10px;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${theme.colors.secondary};

    &:hover {
      background-color: ${theme.colors.tertiary};
    }
  `}
`;

function ProductDetail() {
  const location = useLocation();
  const history = useHistory();
  if (!location.state) {
    return <Redirect to="/error" />;
  }
  const { item } = location.state;
  
  return (
    <Container>
      <Header> Product Details</Header>
      <Section>
        <NameLink>{item.title}</NameLink>
        <Square><Image src={item.images[0]} alt={item.title}></Image></Square>
      </Section>
      <Section>
        <Detail>Description: {item.description}</Detail>
        <Detail>Price: R${item.price}</Detail>
        <Detail>Category: {item.category}</Detail>
        <Detail>Brand: {item.brand}</Detail>
        <Detail>Rating: {item.rating}</Detail>
        <Detail>Available in stock: {item.stock}</Detail>
      </Section>
      <Buttons>
        <BackButton
          onClick={() => {
            history.goBack();
          }}
        >
          <BiArrowBack />
          Back to Products
        </BackButton>
      </Buttons>
    </Container>
  );
}

export default withRouter(ProductDetail);
