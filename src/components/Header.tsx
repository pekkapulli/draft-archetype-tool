import React from 'react';
import styled from 'styled-components';
import { breakpoints, theme } from '../theme';
import { A, P } from './common-styled-components';

const HeaderArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${theme.spacing(3)};
  border-bottom: 1px solid ${theme.colors.grey(5)};
`;

const HeaderPiece = styled.div`
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  @media (max-width: ${breakpoints.tablet}px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const HeaderText = styled.div`
  color: ${theme.colors.black};
  ${theme.fontTitle};
  ${theme.fontSize(4)};
  max-width: 500px;
  margin-right: ${theme.spacing(3)};
`;

export default () => {
  return (
    <HeaderArea>
      <HeaderPiece>
        <HeaderText>Archetypist</HeaderText>
        <P>
          by <A href="https://twitter.com/pekkapulli">Pekka Pulli</A> and{' '}
          <A href="https://twitter.com/Sierkovitz">Sierkovitz</A>, data by{' '}
          <A href="https://17lands.com">17Lands</A>
        </P>
      </HeaderPiece>
    </HeaderArea>
  );
};
