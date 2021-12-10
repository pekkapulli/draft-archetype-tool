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
import { csvParse, csvParseRows, DSVRowArray } from 'd3-dsv';
import DeckPlot from './DeckPlot';
import { Clusters, DeckDatum, DeckList } from '../types';
import { ClusterCharts } from './ClusterCharts';
import { max, min, orderBy } from 'lodash';
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

const KeyIndicatorArea = styled.div`
  margin: ${theme.spacing(1)} 0 0 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  & + & {
    margin: 0;
  }
`;

const KeyIndicatorAmount = styled.div`
  ${theme.fontBold};
  ${theme.fontSize(4)};
  color: ${theme.colors.blue};
  width: 40px;
  text-align: center;
  flex-shrink: 0;
`;

const KeyIndicatorText = styled.div`
  flex-grow: 1;
  color: blue;
  text-transform: uppercase;
  ${theme.fontNormal};
  color: ${theme.colors.blue};
  ${theme.fontSize(0)};
  line-height: 1.2;
`;

interface KeyIndicatorProps {
  amount: string;
  text: string;
}

const KeyIndicator = (props: KeyIndicatorProps) => (
  <KeyIndicatorArea>
    <KeyIndicatorAmount>{props.amount}</KeyIndicatorAmount>
    <KeyIndicatorText>{props.text}</KeyIndicatorText>
  </KeyIndicatorArea>
);

const fetchMetaData = async (
  setMetaData: React.Dispatch<React.SetStateAction<DeckDatum[] | null>>
) => {
  let response = await fetch(`data/metadata.csv`);
  let text = await response.text();
  const parsed: DeckDatum[] = csvParse(text) as unknown as DeckDatum[];
  const sorted: DeckDatum[] = orderBy(
    parsed,
    ['Neighbours average win rate'],
    ['asc']
  );
  setMetaData(sorted);
};

const fetchDeckData = async (
  setDeckLists: React.Dispatch<React.SetStateAction<DeckList[] | null>>
) => {
  let response = await fetch(`data/decklists.csv`);
  let text = await response.text();
  const parsed: DeckList[] = csvParse(text) as unknown as DeckList[];
  setDeckLists(parsed);
};

export default () => {
  const [metaData, setMetaData] = useState<null | DeckDatum[]>(null);
  const [deckLists, setDeckLists] = useState<null | DeckList[]>(null);

  useEffect(() => {
    fetchMetaData(setMetaData);
    fetchDeckData(setDeckLists);
  }, []);

  const [maxWins, minWins, topDecks] = useDeepMemo(() => {
    const neighbourWins = metaData?.map(
      (d) => d['Neighbours average win rate']
    );
    const maxW = max(neighbourWins);
    const minW = min(neighbourWins);

    const topDecks = metaData?.slice(metaData.length * 0.9);

    return [maxW, minW, topDecks];
  }, [metaData]);

  const [clusters, setClusters] = useState<Clusters>({});

  return (
    <ArticleMain>
      <Header header="The Archetypist" />
      <WideTextContent>
        {metaData && topDecks && (
          <DeckPlot
            data={metaData}
            topDecks={topDecks}
            setClusters={setClusters}
          />
        )}
        {metaData && topDecks && deckLists && (
          <ClusterCharts
            clusters={clusters}
            topDecks={topDecks}
            deckLists={deckLists}
          />
        )}
      </WideTextContent>
    </ArticleMain>
  );
};
