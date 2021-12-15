import { scaleLinear } from 'd3-scale';
import { max } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import { Card } from '../types';
import { Legend, LegendItem } from './common-styled-components';
import {
  ParentDimensionsProps,
  withParentDimensions,
} from './generic/withParentDimensions';

interface ChartProps {
  cards: Card[];
  averageAmountsInSet: Record<string, number>;
}

const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 3px;
`;

const Name = styled.div`
  ${theme.fontSize(0)};
`;

const BAR_HEIGHT = 30;
const AVG_BAR_HEIGHT = 6;
const AmountBarBG = styled.div`
  position: relative;
  height: ${BAR_HEIGHT}px;
`;

const Amount = styled.div`
  position: absolute;
  height: ${BAR_HEIGHT - AVG_BAR_HEIGHT}px;
  top: 0;
  left: 0;
  background-color: ${theme.colors.blue};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${theme.fontSize(0)};
  color: white;
  padding-left: ${theme.spacing(2)};
`;

const AVG_MARKER_WIDTH = 2;

const AverageAmount = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${AVG_BAR_HEIGHT}px;
  width: ${AVG_MARKER_WIDTH}px;
  background-color: ${theme.colors.grey(2)};
`;

export const Chart = withParentDimensions(
  (props: ChartProps & ParentDimensionsProps) => {
    const {
      parentDimensions: { width },
      cards,
      averageAmountsInSet,
    } = props;
    const titleWidth = Math.min(Math.max(width / 3, 180), 220);
    const chartWidth = width - titleWidth;
    const maxAmount = max(
      cards.map((c) => max([c.averageAmount, averageAmountsInSet[c.name]]))
    );
    const xScale = scaleLinear()
      .domain([0, maxAmount !== undefined ? maxAmount : 2.5])
      .range([0, chartWidth]);

    return (
      <div>
        <Legend>
          <LegendItem color={theme.colors.blue} text="Average in cluster" />
          <LegendItem color={theme.colors.grey(2)} text="Average in colors" />
        </Legend>
        {cards.map((card) => (
          <CardRow key={card.name}>
            <Name style={{ width: titleWidth }}>{card.name}</Name>
            <AmountBarBG style={{ width: chartWidth }}>
              <Amount style={{ width: `${xScale(card.averageAmount)}px` }}>
                {card.averageAmount.toFixed(1)}
              </Amount>
              <AverageAmount
                style={{ width: xScale(averageAmountsInSet[card.name]) }}
              />
            </AmountBarBG>
          </CardRow>
        ))}
      </div>
    );
  }
);
