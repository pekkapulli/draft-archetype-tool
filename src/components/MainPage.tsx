import React, { useEffect, useMemo, useRef, useState } from 'react';
import scrollama from 'scrollama';
import {
  ArticleMain,
  TextContent,
  WideTextContent,
} from './common-styled-components';
import 'intersection-observer';
import Header from './Header';
import styled from 'styled-components';
import { theme } from '../theme';
import { autoType, csvParse, csvParseRows, DSVRowArray } from 'd3-dsv';
import DeckPlot from './DeckPlot';
import { Cluster, Clusters, DeckDatum, DeckList } from '../types';
import { ClusterCharts } from './ClusterCharts';
import { mapValues, max, min, orderBy } from 'lodash';
import { useDeepMemo } from '../hooks/useDeepMemo';

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: ${theme.spacing(3)} 0;
`;

const Card = styled.div`
  padding: ${theme.spacing(3)};
  margin: 0 ${theme.spacing(3)} ${theme.spacing(3)} 0;
  background-color: ${theme.colors.grey(5)};
  max-width: 320px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 3px 3px ${theme.colors.blue};
  }
`;

const fetchMetaData = async (
  setMetaData: React.Dispatch<React.SetStateAction<DeckDatum[] | null>>
) => {
  let response = await fetch(`data/metadata.csv`);
  let text = await response.text();
  const parsed: DeckDatum[] = csvParse(
    text,
    autoType
  ) as unknown as DeckDatum[];
  const sorted: DeckDatum[] = orderBy(
    parsed,
    ['Neighbours average win rate'],
    ['asc']
  ).map((d) => ({
    ...d,
    'NMDS 1': Number(d['NMDS 1']) + 1,
    'NMDS 2': Number(d['NMDS 2']) + 1,
  }));
  setMetaData(sorted);
};

const fetchDeckData = async (
  setDeckLists: React.Dispatch<React.SetStateAction<DeckList[] | null>>
) => {
  let response = await fetch(`data/decklists.csv`);
  let text = await response.text();
  const parsed: DeckList[] = csvParse(text, autoType) as unknown as DeckList[];
  setDeckLists(parsed);
};

export default () => {
  const [metaData, setMetaData] = useState<null | DeckDatum[]>(null);
  const [deckLists, setDeckLists] = useState<null | DeckList[]>(null);
  const [filterTopDecks, setFilterTopDecks] = useState<boolean>(false);

  useEffect(() => {
    fetchMetaData(setMetaData);
    fetchDeckData(setDeckLists);
  }, []);

  const [decks, topDecks] = useDeepMemo(() => {
    const topDecks = metaData?.slice(metaData.length * 0.9);
    const dataSet = filterTopDecks ? topDecks : metaData;

    return [dataSet, topDecks];
  }, [metaData, filterTopDecks]);

  const [clusters, setClusters] = useState<Clusters>({});

  const getDecksForCluster = (cluster: Cluster) => {
    return (
      decks?.filter(
        (deck) =>
          deck['NMDS 1'] > cluster.x1 &&
          deck['NMDS 1'] < cluster.x2 &&
          deck['NMDS 2'] < cluster.y1 &&
          deck['NMDS 2'] > cluster.y2
      ) || []
    );
  };

  useEffect(() => {
    setClusters(
      mapValues(clusters, (cluster) => ({
        ...cluster,
        decks: getDecksForCluster(cluster),
      }))
    );
  }, [filterTopDecks]);

  const addCluster = (cluster: Cluster) => {
    setClusters({
      ...clusters,
      [cluster.id]: {
        ...cluster,
        decks: getDecksForCluster(cluster),
      },
    });
  };

  const removeCluster = (id: string) => {
    console.log('remove', id);
    const newClusters = Object.keys(clusters)
      .filter((cluster) => cluster !== id)
      .reduce<Clusters>(
        (result, cluster, i) => ({
          ...result,
          [i.toString()]: {
            ...clusters[cluster],
            id: i.toString(),
          },
        }),
        {}
      );
    setClusters(newClusters);
  };

  return (
    <ArticleMain>
      <Header header="The Archetypist" />
      <WideTextContent>
        <label style={{ cursor: 'pointer' }}>
          <input
            type="checkbox"
            onChange={(event) => setFilterTopDecks(event.target.checked)}
            checked={filterTopDecks}
          />{' '}
          Filter to top decks
        </label>
        {decks && topDecks && (
          <DeckPlot
            data={decks}
            topDecks={topDecks}
            clusters={clusters}
            addCluster={addCluster}
            removeCluster={removeCluster}
          />
        )}
        {decks && topDecks && deckLists && (
          <ClusterCharts
            clusters={clusters}
            topDecks={topDecks}
            deckLists={deckLists}
            removeCluster={removeCluster}
          />
        )}
      </WideTextContent>
    </ArticleMain>
  );
};
