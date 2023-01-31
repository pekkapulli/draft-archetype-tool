import { scaleLinear } from 'd3-scale';
import { max } from 'lodash';
import { theme } from '../theme';
import { Card } from '../types';
import { Legend, LegendItem } from './common-styled-components';
import {
  ParentDimensionsProps,
  withParentDimensions,
} from './generic/withParentDimensions';
import { CardRowWithPopup } from './CardRowWithPopup';

interface ChartProps {
  cards: Card[];
  averageAmountsInSet: Record<string, number>;
}

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
          <CardRowWithPopup card={card}
          titleWidth={titleWidth}
          chartWidth={chartWidth}
          averageAmountWidth={xScale(averageAmountsInSet[card.name])}
          amountWidth={xScale(card.averageAmount)}
          inDeckList={false}></CardRowWithPopup>
        ))}
      </div>
    );
  }
);
