import React from 'react';
import styled from 'styled-components';
import { breakpoints, theme } from '../theme';
import { StrippedLink } from './common-styled-components';

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
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
`;

const HeaderText = styled.div`
  color: ${theme.colors.blue};
  ${theme.fontBold};
  ${theme.fontSize(3)};
  max-width: 500px;
`;

const Name = styled.div`
  color: ${theme.colors.blue};
  ${theme.fontBold};
`;

const Arrow = styled.span`
  display: inline-block;
  ${theme.fontSize(-2)};
  padding-left: 4px;
`;

const BackLink = styled.div`
  ${theme.fontSize(5)};
  ${theme.fontBold};
  color: ${theme.colors.blue};
  margin-right: ${theme.spacing(4)};
`;

interface Props {
  header: string;
  backLink?: string;
}

export default (props: Props) => {
  return (
    <HeaderArea>
      <HeaderPiece>
        {props.backLink ? (
          <StrippedLink to={props.backLink}>
            <BackLink>〈</BackLink>
          </StrippedLink>
        ) : undefined}
        <HeaderText>{props.header}</HeaderText>
      </HeaderPiece>
    </HeaderArea>
  );
};
