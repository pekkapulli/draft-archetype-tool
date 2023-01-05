import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import { Card, DeckDatumWithList } from '../types';
import { P, SmallTitle } from './common-styled-components';
import { TitleWithButtons } from './TitleWithButtons';
import { Chart } from './Chart';
import { ExampleDecks } from './ExampleDecks';

interface ClusterAnalysis {
  cluster: string;
  averageWinRate: number;
  averageWins: number;
  averageAmounts: Card[];
  decks: DeckDatumWithList[];
}

interface ClusterCardProps {
  clusterAnalysis: ClusterAnalysis;
  averageAmountsInSet: Record<string, number>;
  removeCluster: (id: string) => void;
}

const ClusterCardContainer = styled.div`
  margin: ${theme.spacing(4)} 0;
  background-color: ${theme.colors.grey(5)};
  padding: ${theme.spacing(3)};
`;

const ClusterCard = (props: ClusterCardProps) => {
  return (
    <ClusterCardContainer>
      <TitleWithButtons
        size="largeCard"
        buttons={[
          {
            text: 'X',
            onClick: () => props.removeCluster(props.clusterAnalysis.cluster),
          },
        ]}
      >
        Cluster {props.clusterAnalysis.cluster}
      </TitleWithButtons>
      <P>
        Average win rate:{' '}
        {(props.clusterAnalysis.averageWinRate * 100).toFixed(1)} %
        <br />
        Average wins: {props.clusterAnalysis.averageWins.toFixed(1)}
        <br />
        Number of decks: {props.clusterAnalysis.decks.length}
      </P>
      <SmallTitle>Most played cards</SmallTitle>
      <div>
        <Chart
          cards={props.clusterAnalysis.averageAmounts.slice(0, 15)}
          averageAmountsInSet={props.averageAmountsInSet}
        />
      </div>
      <ExampleDecks deckLists={props.clusterAnalysis.decks} />
    </ClusterCardContainer>
  );
};

export default ClusterCard;
