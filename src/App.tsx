import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { theme } from './theme';

import MainPage from './components/MainPage';

const AppMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex-wrap: nowrap;
  ${theme.fontNormal};
`;

export const routes = {
  main: '/',
};

export default () => {
  return (
    <Router>
      <AppMain>
        <Switch>
          <Route exact path={routes.main}>
            <MainPage />
          </Route>
        </Switch>
      </AppMain>
    </Router>
  );
};
