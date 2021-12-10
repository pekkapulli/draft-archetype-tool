import React, { useState } from 'react';
import { mapValues, orderBy, sum } from 'lodash';
import styled from 'styled-components';
import { useDeepMemo } from '../hooks/useDeepMemo';
import { Clusters, DeckDatum, DeckList } from '../types';
import ClusterCard from './ClusterCard';

interface ClusterChartsProps {
  clusters: Clusters;
  topDecks: DeckDatum[];
  deckLists: DeckList[];
}

const ClusterChartsContainer = styled.div`
  width: 100;
`;

export const ClusterCharts = (props: ClusterChartsProps) => {
  const { clusters, topDecks, deckLists } = props;
  // const [filterTopDecks, setFilterTopDecks] = useState<boolean>(false);

  const [cards] = useDeepMemo(() => {
    return [Object.keys(deckLists[0]).filter((key) => key !== 'ID')];
  }, [deckLists]);

  const [clusterAnalysis] = useDeepMemo(() => {
    const analysis = mapValues(clusters, (decks, cluster) => {
      const clusterDecksWithLists = decks.map((deck) => ({
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
        cluster,
        averageWins,
        averageAmounts: orderBy(averageAmounts, 'averageAmount', 'desc'),
        decks: clusterDecksWithLists,
      };
    });
    return [analysis];
  }, [clusters, topDecks, deckLists]);

  return (
    <ClusterChartsContainer>
      {/* <label>
        <input
          type="checkbox"
          onChange={(event) => setFilterTopDecks(event.target.checked)}
          checked={filterTopDecks}
        />{' '}
        Filter to top decks
      </label> */}
      {Object.keys(props.clusters).map((cluster) => (
        <ClusterCard key={cluster} clusterAnalysis={clusterAnalysis[cluster]} />
      ))}
    </ClusterChartsContainer>
  );
};
