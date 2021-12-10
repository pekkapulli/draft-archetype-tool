import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import {
  withParentDimensions,
  ParentDimensionsProps,
} from './generic/withParentDimensions';

type Side = 'left' | 'right';

interface InfoTextProps {
  side: Side;
  inView: boolean;
}

type Props = InfoTextProps & ParentDimensionsProps;

const infoBoxWidth = 200;

const InfoTextContainer = styled.div<{ side: Side }>`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: ${(p) => (p.side === 'right' ? 'row' : 'row-reverse')};

  transition: opacity 1.5s;
`;

const InfoTextContent = styled.div`
  background: ${theme.colors.lightRed};
  padding: ${theme.spacing(2)};
  width: ${infoBoxWidth}px;
  margin-top: -25%;
`;

const ARROW_SIZE = 10;

const Arrow = styled.div<{ side: Side }>`
  width: 0;
  height: 0;
  margin-top: ${(ARROW_SIZE / 3) * 2}px;
  border-top: ${ARROW_SIZE}px solid transparent;
  border-bottom: ${ARROW_SIZE}px solid transparent;
  ${(p) =>
    p.side === 'left'
      ? 'border-left'
      : 'border-right'}: ${ARROW_SIZE}px solid ${theme.colors.lightRed};
`;

const InfoText: React.FunctionComponent<Props> = (props) => {
  const {
    side,
    inView,
    parentDimensions: { width },
  } = props;
  const left = props.side === 'left' ? -infoBoxWidth - ARROW_SIZE : width;
  return (
    <InfoTextContainer side={side} style={{ left, opacity: inView ? 0.8 : 0 }}>
      <Arrow side={side} />
      <InfoTextContent>{props.children}</InfoTextContent>
    </InfoTextContainer>
  );
};

export default withParentDimensions(InfoText);
