import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import { DeckDatum, DeckDatumWithList } from '../types';
import { P, SmallSubtitle } from './common-styled-components';
import {
  ParentDimensionsProps,
  withParentDimensions,
} from './generic/withParentDimensions';
import { TitleWithButtons } from './TitleWithButtons';

interface ClusterAnalysis {
  cluster: string;
  averageWins: number;
  averageAmounts: {
    name: string;
    averageAmount: number;
  }[];
  decks: DeckDatumWithList[];
}

interface ClusterCardProps {
  clusterAnalysis: ClusterAnalysis;
}

const ClusterCardContainer = styled.div`
  margin: ${theme.spacing(4)} 0;
  background-color: ${theme.colors.grey(5)};
  padding: ${theme.spacing(3)};
`;

const ClusterCard = (props: ClusterCardProps & ParentDimensionsProps) => {
  return (
    <ClusterCardContainer>
      <TitleWithButtons size="card">
        Cluster {props.clusterAnalysis.cluster}
      </TitleWithButtons>
      <P>Average wins: {props.clusterAnalysis.averageWins.toFixed(1)}</P>
      <SmallSubtitle>Most played cards</SmallSubtitle>
      {props.clusterAnalysis.averageAmounts.slice(0, 15).map((card) => (
        <P key={card.name}>
          <strong>{card.name}: </strong>
          {card.averageAmount.toFixed(1)}
        </P>
      ))}
    </ClusterCardContainer>
  );
};

export default withParentDimensions(ClusterCard);
