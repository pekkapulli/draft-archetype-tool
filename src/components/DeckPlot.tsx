import React, { useEffect, useRef, useState } from 'react';
import { brush, D3BrushEvent } from 'd3-brush';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { range } from 'lodash';
import { useDeepMemo } from '../hooks/useDeepMemo';
import { theme } from '../theme';
import { Clusters, DeckDatum } from '../types';
import {
  ParentDimensionsProps,
  withParentDimensions,
} from './generic/withParentDimensions';

interface Props {
  data: DeckDatum[];
  topDecks: DeckDatum[];
  setClusters: (clusters: Clusters) => void;
}

interface NodeSelector {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  id: number;
  decks?: DeckDatum[];
}

const neighbourKeys = range(1, 20, 1).map((n) => `Neigh${n}`);

const DeckPlot = (props: Props & ParentDimensionsProps) => {
  const { parentDimensions, data, topDecks, setClusters } = props;
  const width = parentDimensions.width;
  const height = width * 0.5;

  const [nodeSelectors, setNodeSelectors] = useState<NodeSelector[]>([]);

  const [selectionInProcess, setSelectionInProcess] = useState<
    NodeSelector | undefined
  >(undefined);
  const svgRef = useRef<SVGSVGElement>(null);

  // const scaleColor = scaleLinear<string>()
  //   .domain([
  //     minWins !== undefined ? minWins : 0,
  //     maxWins !== undefined ? maxWins : 1,
  //   ])
  //   .range([theme.colors.grey(5), theme.colors.blue])
  //   .interpolate(interpolateHcl);

  const [plot, xScale, yScale] = useDeepMemo(() => {
    const xScale = scaleLinear().range([0, width]).domain([-1, 1]);
    const yScale = scaleLinear().range([height, 0]).domain([-1, 1]);
    //  scaleColor(d['Neighbours average win rate'])
    const plotRender = data.map((d) => (
      <circle
        cx={xScale(d['NMDS 1'])}
        cy={yScale(d['NMDS 2'])}
        fill={
          topDecks.find((td) => td['Deck ID'] === d['Deck ID'])
            ? theme.colors.blue
            : theme.colors.grey(4)
        }
        r={3}
        key={d['Deck ID']}
      />
    ));
    return [plotRender, xScale, yScale];
  }, [data, width, height]);

  useEffect(() => {
    const sweeper = brush()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('start brush end', (event: D3BrushEvent<SVGSVGElement>) => {
        if (event.selection) {
          const eventSelection = event.selection as [
            [number, number],
            [number, number]
          ];

          const selection: NodeSelector = {
            x1: xScale.invert(eventSelection[0][0]),
            x2: xScale.invert(eventSelection[1][0]),
            y1: yScale.invert(eventSelection[0][1]),
            y2: yScale.invert(eventSelection[1][1]),
            id: 0,
          };
          if (event.type === 'brush') {
            setSelectionInProcess(selection);
          } else if (event.type === 'end') {
            setSelectionInProcess(undefined);
            selection.id = nodeSelectors.length;
            selection.decks = data.filter(
              (deck) =>
                deck['NMDS 1'] > selection.x1 &&
                deck['NMDS 1'] < selection.x2 &&
                deck['NMDS 2'] < selection.y1 &&
                deck['NMDS 2'] > selection.y2
            );
            const newNodeSelectors = nodeSelectors.concat(selection);
            setNodeSelectors(newNodeSelectors);
            setClusters(
              newNodeSelectors.reduce<Clusters>((result, selector) => {
                return {
                  ...result,
                  [selector.id]: selector.decks,
                };
              }, {})
            );
          }
        }
      });
    select(svgRef.current)
      .select('.brush')
      .call(sweeper as any);
  }, [width, height, nodeSelectors]);

  return (
    <svg width={width} height={height} ref={svgRef}>
      {plot}
      <g className="brush" />
      {nodeSelectors.map((selector) => (
        <g key={selector.id}>
          <rect
            key={selector.id}
            stroke={theme.colors.grey(3)}
            x={xScale(selector.x1)}
            width={Math.abs(xScale(selector.x2) - xScale(selector.x1))}
            y={yScale(selector.y1)}
            height={Math.abs(yScale(selector.y1) - yScale(selector.y2))}
            style={{ pointerEvents: 'none' }}
            fill={theme.colors.purple}
            opacity={0.3}
          />
          <text
            x={xScale(selector.x1) + 3}
            y={yScale(selector.y2) - 3}
            style={{ fontWeight: 'bold' }}
          >
            {selector.id}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default withParentDimensions(DeckPlot);
