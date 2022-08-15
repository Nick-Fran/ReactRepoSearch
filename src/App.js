import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, Theme } from "./globals/styles";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Search from "./components/Search";
import ProductDetail from "./components/ProductDetail";
import Error from "./components/Error";

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Switch>
          <Route exact path="/error" component={Error} />
          <Route path="/info/*" component={ProductDetail} />
          <Route path="/search/:q" component={Search} />
          <Route exact path="/" component={Search} />
          <Redirect to="/" />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
