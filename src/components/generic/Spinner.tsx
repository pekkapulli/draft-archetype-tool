import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

const SpinnerContainer = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SpinnerImage = styled.img`
  width: 40px;
  height: 40px;

  animation-name: spin;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-timing-function: ease;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerText = styled.div`
  color: ${theme.colors.midGrey};
  ${theme.fontNormal};
  margin-top: ${theme.spacing(1)};
  ${theme.fontSize(-1)};
`;

import spinnerImage from '../../../images/spinner.png';

export const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerImage src={spinnerImage} />
      <SpinnerText>Ladataan…</SpinnerText>
    </SpinnerContainer>
  );
};
