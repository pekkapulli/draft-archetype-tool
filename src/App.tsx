import React from 'react';
import styled from 'styled-components';
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

export default () => {
  return (
    <AppMain>
      <MainPage />
    </AppMain>
  );
};
