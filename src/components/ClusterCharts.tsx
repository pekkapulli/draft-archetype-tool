import React from 'react';
import { mapValues, orderBy, sum } from 'lodash';
import styled from 'styled-components';
import { useDeepMemo } from '../hooks/useDeepMemo';
import { Clusters, DeckDatum, DeckList } from '../types';
import ClusterCard from './ClusterCard';

interface ClusterChartsProps {
  clusters: Clusters;
  topDecks: DeckDatum[];
  deckLists: DeckList[];
  removeCluster: (id: string) => void;
}

const ClusterChartsContainer = styled.div`
  width: 100;
`;

export const ClusterCharts = (props: ClusterChartsProps) => {
  const { clusters, topDecks, deckLists, removeCluster } = props;

  const [cards] = useDeepMemo(() => {
    return [
      Object.keys(deckLists[0]).filter(
        (key) =>
          !['ID', 'Plains', 'Island', 'Swamp', 'Mountain', 'Forest'].includes(
            key
          )
      ),
    ];
  }, [deckLists]);

  const [clusterAnalysis] = useDeepMemo(() => {
    const analysis = mapValues(clusters, (cluster, id) => {
      const clusterDecksWithLists = cluster.decks.map((deck) => ({
        ...deck,
        deckList: deckLists.find((list) => list.ID === deck['Deck ID']),
      }));
      const averageWins =
        sum(clusterDecksWithLists.map((d) => Number(d.Wins))) /
        clusterDecksWithLists.length;
      const averageAmounts = cards.map((cardName) => ({
        name: cardName,
        averageAmount:
          sum(
            clusterDecksWithLists.map((deck) =>
              deck.deckList ? Number(deck.deckList[cardName]) : 0
            )
          ) / clusterDecksWithLists.length,
      }));
      return {
        cluster: id,
        averageWins,
        averageAmounts: orderBy(averageAmounts, 'averageAmount', 'desc'),
        decks: clusterDecksWithLists,
      };
    });
    return [analysis];
  }, [clusters, topDecks, deckLists]);

  return (
    <ClusterChartsContainer>
      {orderBy(Object.keys(props.clusters), undefined, 'desc').map(
        (cluster) => (
          <ClusterCard
            key={cluster}
            clusterAnalysis={clusterAnalysis[cluster]}
            removeCluster={removeCluster}
          />
        )
      )}
    </ClusterChartsContainer>
  );
};
