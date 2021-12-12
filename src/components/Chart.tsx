import { scaleLinear } from 'd3-scale';
import { max } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import { Card } from '../types';
import {
  ParentDimensionsProps,
  withParentDimensions,
} from './generic/withParentDimensions';

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

export const Chart = withParentDimensions(
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
