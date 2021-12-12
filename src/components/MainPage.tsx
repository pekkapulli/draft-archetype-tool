import React, { useEffect, useState } from 'react';
import { A, ArticleMain, P, WideTextContent } from './common-styled-components';
import 'intersection-observer';
import Header from './Header';
import styled from 'styled-components';
import { theme } from '../theme';
import { autoType, csvParse } from 'd3-dsv';
import DeckPlot from './DeckPlot';
import { Cluster, Clusters, DeckDatum, DeckList } from '../types';
import { ClusterCharts } from './ClusterCharts';
import { mapValues, orderBy } from 'lodash';
import { useDeepMemo } from '../hooks/useDeepMemo';

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

const InlineInput = styled.input`
  display: inline-block;
  height: 16px;
  width: 50px;
  border: none;
  border-bottom: 1px dashed ${theme.colors.blue};
  color: ${theme.colors.blue};
  ${theme.fontBold};
  ${theme.fontSize(0)};
`;

export default () => {
  const [metaData, setMetaData] = useState<null | DeckDatum[]>(null);
  const [deckLists, setDeckLists] = useState<null | DeckList[]>(null);
  const [filterTopDecks, setFilterTopDecks] = useState<boolean>(false);
  const [topPercentage, setTopPercentage] = useState<number>(10);

  useEffect(() => {
    fetchMetaData(setMetaData);
    fetchDeckData(setDeckLists);
  }, []);

  const [decks, topDecks] = useDeepMemo(() => {
    const topDecks = metaData?.slice(
      metaData.length * (1 - topPercentage / 100)
    );
    console.log(topDecks?.length);
    const dataSet = filterTopDecks ? topDecks : metaData;

    return [dataSet, topDecks];
  }, [metaData, filterTopDecks, topPercentage]);

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
      <Header />
      <WideTextContent>
        <P>
          This is a representation of 2000 latest RG decks in Innistrad: Crimson
          Vow. Similar decks are closer to each other on the map.
        </P>
        <P>
          Each deck is given a value according to the win rate of it and its 19
          closest neighbours. The top{' '}
          <InlineInput
            type="number"
            step={1}
            min={1}
            max={99}
            value={topPercentage}
            onChange={(event) => setTopPercentage(event.target.valueAsNumber)}
          />{' '}
          % of these values are highlighted in blue. These blue clusters can
          help define different strong deck compositions in the colour pair.
        </P>
        <P>Create boxes by dragging on the graph to explore clusters.</P>
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
