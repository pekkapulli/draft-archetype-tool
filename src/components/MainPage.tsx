import React, { useEffect, useState } from 'react';
import { A, ArticleMain, P, WideTextContent } from './common-styled-components';
import 'intersection-observer';
import Header from './Header';
import styled from 'styled-components';
import { theme } from '../theme';
import { autoType, csvParse } from 'd3-dsv';
import DeckPlot from './DeckPlot';
import {
  Cluster,
  Clusters,
  ColorWinRateRow,
  ColorWinRates,
  DeckDatum,
  DeckList,
} from '../types';
import { ClusterCharts } from './ClusterCharts';
import { mapValues, orderBy, sum } from 'lodash';
import { useDeepMemo } from '../hooks/useDeepMemo';

const SET_ID = 'BRO';
const SET_NAME = "Brothers' War";

const fetchMetaData = async (
  selectedColors: string,
  setMetaData: React.Dispatch<React.SetStateAction<DeckDatum[] | null>>
) => {
  let response = await fetch(`data/${SET_ID}metadata${selectedColors}.csv`);
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
    NMDS1: Number(d.NMDS1) + 1,
    NMDS2: Number(d.NMDS2) + 1,
  }));
  setMetaData(sorted);
};

const fetchDeckData = async (
  selectedColors: string,
  setDeckLists: React.Dispatch<React.SetStateAction<DeckList[] | null>>
) => {
  let response = await fetch(`data/${SET_ID}${selectedColors}.csv`);
  let text = await response.text();
  const parsed: DeckList[] = csvParse(text, autoType) as unknown as DeckList[];
  setDeckLists(parsed);
};

const fetchColorWinRates = async (
  setMetaData: React.Dispatch<React.SetStateAction<ColorWinRates | null>>
) => {
  let response = await fetch(`data/${SET_ID}_winrates.csv`);
  let text = await response.text();
  const parsed: ColorWinRateRow[] = csvParse(
    text,
    autoType
  ) as unknown as ColorWinRateRow[];
  setMetaData(
    parsed.reduce<ColorWinRates>(
      (result, row) => ({ ...result, [row.Pair]: row['Win Rate'] }),
      {}
    )
  );
};

const InlineInput = styled.input`
  display: inline-block;
  height: 20px;
  width: 50px;
  border: none;
  border-bottom: 1px dashed ${theme.colors.blue};
  color: ${theme.colors.blue};
  ${theme.fontBold};
  ${theme.fontSize(0)};
  padding: 0 2px;
`;

const InlineSelect = styled.select`
  display: inline-block;
  height: 20px;
  width: 100px;
  border: none;
  border-bottom: 1px dashed ${theme.colors.blue};
  color: ${theme.colors.blue};
  ${theme.fontBold};
  ${theme.fontSize(0)};
  padding: 0 2px;
`;

const Footer = styled.footer`
  margin-top: ${theme.spacing(5)};
  width: 100%;
  padding: ${theme.spacing(5)} 0;
`;

const colors = ['WU', 'UB', 'BR', 'RG', 'WG', 'WB', 'BG', 'UG', 'UR', 'WR'];

const colorNames: Record<string, string> = {
  WUG: 'WUG (Brokers)',
  WUB: 'WUB (Obscura)',
  UBR: 'UBR (Maestros)',
  WRG: 'WRG (Cabaretti)',
  BRG: 'BRG (Riveteers)',
  WU: 'WU',
  UB: 'UB',
  BR: 'BR',
  RG: 'RG',
  WG: 'WG',
  WB: 'WB',
  BG: 'BG',
  UG: 'UG',
  UR: 'UR',
  WR: 'WR',
};

export default () => {
  const [metaData, setMetaData] = useState<null | DeckDatum[]>(null);
  const [deckLists, setDeckLists] = useState<null | DeckList[]>(null);
  const [colorWinRates, setColorWinRates] = useState<null | ColorWinRates>(
    null
  );
  const [filterTopDecks, setFilterTopDecks] = useState<boolean>(false);
  const [winRateThreshold, setWinRateThreshold] = useState<number>(60);
  const [bottomThreshold, setBottomThreshold] = useState<number>(55);
  const [selectedColors, setSelectedColors] = useState<string>(colors[0]);

  useEffect(() => {
    fetchColorWinRates(setColorWinRates);
  }, []);

  useEffect(() => {
    if (colorWinRates) {
      setBottomThreshold(colorWinRates.TOTAL * 100);
    }
  }, [colorWinRates?.TOTAL]);

  useEffect(() => {
    setClusters({});
    fetchMetaData(selectedColors, setMetaData);
    fetchDeckData(selectedColors, setDeckLists);
  }, [selectedColors]);

  const [decks, topDecks, bottomDecks, cards, averageAmounts] =
    useDeepMemo(() => {
      const topDecks = metaData?.filter(
        (deck) => deck['Neighbours average win rate'] >= winRateThreshold / 100
      );
      const bottomDecks = metaData?.filter(
        (deck) => deck['Neighbours average win rate'] <= bottomThreshold / 100
      );
      const dataSet = filterTopDecks ? topDecks : metaData;

      const cards = deckLists
        ? Object.keys(deckLists[0]).filter(
            (key) =>
              ![
                'ID',
                'Plains',
                'Island',
                'Swamp',
                'Mountain',
                'Forest',
              ].includes(key)
          )
        : [];

      const averages =
        deckLists && cards
          ? cards.reduce<Record<string, number>>(
              (result, cardName) => ({
                ...result,
                [cardName]:
                  sum(deckLists.map((list) => list[cardName])) /
                  deckLists.length,
              }),
              {}
            )
          : {};

      return [dataSet, topDecks, bottomDecks, cards, averages];
    }, [
      metaData,
      deckLists,
      filterTopDecks,
      winRateThreshold,
      bottomThreshold,
    ]);

  const [clusters, setClusters] = useState<Clusters>({});

  const getDecksForCluster = (cluster: Cluster) => {
    return (
      decks?.filter(
        (deck) =>
          deck.NMDS1 > cluster.x1 &&
          deck.NMDS1 < cluster.x2 &&
          deck.NMDS2 < cluster.y1 &&
          deck.NMDS2 > cluster.y2
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
          This is a plot of 1000 recent{' '}
          <InlineSelect
            onChange={(e) => setSelectedColors(e.target.value)}
            value={selectedColors}
          >
            {colors.map((c) => (
              <option key={c} value={c}>
                {colorNames[c]}
              </option>
            ))}
          </InlineSelect>{' '}
          Bo1 draft decks in {SET_NAME} on Magic Arena.
        </P>
        <P>
          Similar decks (more of the same cards) are closer to each other on the
          map, and decks with more wins have bigger dots.
        </P>
        <P>
          Each deck is given a value according to the average win rate of it and
          its 14 closest neighbours. Decks above{' '}
          <InlineInput
            type="number"
            step={1}
            min={50}
            max={99}
            value={winRateThreshold}
            onChange={(event) =>
              setWinRateThreshold(event.target.valueAsNumber)
            }
          />
          % win rate are highlighted in blue and decks below the overall average
          win rate ({bottomThreshold} %) as light red. The blue clusters can
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
        {decks && topDecks && bottomDecks && (
          <DeckPlot
            data={decks}
            topDecks={topDecks}
            bottomDecks={bottomDecks}
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
            cards={cards}
            averageAmounts={averageAmounts}
          />
        )}
      </WideTextContent>
      <Footer>
        <WideTextContent>
          <P>
            Archetypist created by{' '}
            <A href="https://pekkapulli.com">Pekka Pulli</A> and{' '}
            <A href="https://twitter.com/Sierkovitz">Sierkovitz</A>, data by{' '}
            <A href="https://17lands.com">17Lands</A>
          </P>
          <P>
            <A href="https://github.com/pekkapulli/draft-archetype-tool">
              Archetypist on Github
            </A>
          </P>
          <P>Updated January 5th 2023.</P>
        </WideTextContent>
      </Footer>
    </ArticleMain>
  );
};
