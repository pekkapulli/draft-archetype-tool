import React from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'lodash';
import styled from 'styled-components';
import { theme } from '../theme';
import { DeckDatumWithList } from '../types';
import { P, SmallTitle } from './common-styled-components';
import {
  ParentDimensionsProps,
  withParentDimensions,
} from './generic/withParentDimensions';
import { TitleWithButtons } from './TitleWithButtons';

interface ClusterAnalysis {
  cluster: string;
  averageWins: number;
  averageAmounts: Card[];
  decks: DeckDatumWithList[];
}

interface Card {
  name: string;
  averageAmount: number;
}

interface ClusterCardProps {
  clusterAnalysis: ClusterAnalysis;
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
        Average wins: {props.clusterAnalysis.averageWins.toFixed(1)}
        <br />
        Number of decks: {props.clusterAnalysis.decks.length}
      </P>
      <SmallTitle>Most played cards</SmallTitle>
      <div>
        <Chart cards={props.clusterAnalysis.averageAmounts.slice(0, 15)} />
      </div>
    </ClusterCardContainer>
  );
};

interface ChartProps {
  cards: Card[];
}

const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 2px;
`;

const Name = styled.div`
  ${theme.fontSize(-1)};
`;

const BAR_HEIGHT = 30;
const AmountBarBG = styled.div`
  position: relative;
  height: ${BAR_HEIGHT}px;
`;

const Amount = styled.div`
  position: absolute;
  height: ${BAR_HEIGHT}px;
  top: 0;
  left: 0;
  background-color: ${theme.colors.blue};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${theme.fontSize(-1)};
  color: white;
  padding-left: ${theme.spacing(2)};
`;

const Chart = withParentDimensions(
  (props: ChartProps & ParentDimensionsProps) => {
    const {
      parentDimensions: { width },
      cards,
    } = props;
    const titleWidth = Math.min(Math.max(width / 3, 180), 220);
    const chartWidth = width - titleWidth;
    const maxAmount = max(cards.map((c) => c.averageAmount));
    const xScale = scaleLinear()
      .domain([0, maxAmount !== undefined ? maxAmount : 2.5])
      .range([0, chartWidth]);

    return (
      <div>
        {cards.map((card) => (
          <CardRow key={card.name}>
            <Name style={{ width: titleWidth }}>{card.name}</Name>
            <AmountBarBG style={{ width: chartWidth }}>
              <Amount style={{ width: `${xScale(card.averageAmount)}px` }}>
                {card.averageAmount.toFixed(1)}
              </Amount>
            </AmountBarBG>
          </CardRow>
        ))}
      </div>
    );
  }
);

export default ClusterCard;
