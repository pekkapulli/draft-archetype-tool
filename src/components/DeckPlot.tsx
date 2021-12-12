import React, { useEffect, useRef } from 'react';
import { brush, D3BrushEvent } from 'd3-brush';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { max, min, values } from 'lodash';
import { useDeepMemo } from '../hooks/useDeepMemo';
import { theme } from '../theme';
import { Cluster, Clusters, DeckDatum } from '../types';
import {
  ParentDimensionsProps,
  withParentDimensions,
} from './generic/withParentDimensions';
import styled from 'styled-components';

interface Props {
  data: DeckDatum[];
  topDecks: DeckDatum[];
  clusters: Clusters;
  addCluster: (cluster: Cluster) => void;
  removeCluster: (id: string) => void;
}

const SVG = styled.svg`
  margin: ${theme.spacing(4)} 0;
`;

const DeckPlot = (props: Props & ParentDimensionsProps) => {
  const {
    parentDimensions,
    data,
    topDecks,
    clusters,
    addCluster,
    removeCluster,
  } = props;
  const width = parentDimensions.width;
  const height = width * 0.5;
  const svgRef = useRef<SVGSVGElement>(null);

  const [plot, xScale, yScale] = useDeepMemo(() => {
    const xValues = data
      .map((d) => d['NMDS 1'])
      .concat(values(clusters).flatMap((c) => [c.x1, c.x2]));
    const yValues = data
      .map((d) => d['NMDS 2'])
      .concat(values(clusters).flatMap((c) => [c.y1, c.y2]));
    const minX = min(xValues);
    const maxX = max(xValues);
    const minY = min(yValues);
    const maxY = max(yValues);
    const xScale = scaleLinear()
      .range([5, width - 5])
      .domain([minX !== undefined ? minX : 0, maxX !== undefined ? maxX : 2]);
    const yScale = scaleLinear()
      .range([height - 5, 5])
      .domain([minY !== undefined ? minY : 0, maxY !== undefined ? maxY : 2]);
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
  }, [data, width, height, clusters, topDecks]);

  useEffect(() => {
    const sweeper = brush()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('start brush end', (event: D3BrushEvent<SVGSVGElement>) => {
        if (event.selection && event.type === 'end') {
          const eventSelection = event.selection as [
            [number, number],
            [number, number]
          ];
          const cluster: Cluster = {
            x1: xScale.invert(eventSelection[0][0]),
            x2: xScale.invert(eventSelection[1][0]),
            y1: yScale.invert(eventSelection[0][1]),
            y2: yScale.invert(eventSelection[1][1]),
            id: '',
            decks: [],
          };
          cluster.id = Object.keys(clusters).length.toString();
          addCluster(cluster);
          select(svgRef.current)
            .select('.brush')
            .call(sweeper.clear as any);
        }
      });
    select(svgRef.current)
      .select('.brush')
      .call(sweeper as any);
  }, [width, height, clusters, data]);

  return (
    <SVG width={width} height={height} ref={svgRef}>
      {plot}
      <g className="brush" />
      {values(clusters).map((cluster: Cluster) => (
        <g key={cluster.id}>
          <rect
            key={cluster.id}
            stroke={theme.colors.grey(3)}
            x={xScale(cluster.x1)}
            width={Math.abs(xScale(cluster.x2) - xScale(cluster.x1))}
            y={yScale(cluster.y1)}
            height={Math.abs(yScale(cluster.y1) - yScale(cluster.y2))}
            style={{ pointerEvents: 'none' }}
            fill={theme.colors.purple}
            opacity={0.3}
          />
          <text
            x={xScale(cluster.x1) + 3}
            y={yScale(cluster.y2) - 3}
            style={{ fontWeight: 'bold', pointerEvents: 'none' }}
            fill="white"
            fontSize={12}
          >
            {cluster.id}
          </text>
          <g onClick={() => removeCluster(cluster.id)}>
            <circle
              cx={xScale(cluster.x2) - 2}
              cy={yScale(cluster.y1) + 2}
              r={6}
              fill={theme.colors.blue}
              strokeWidth={0.5}
              stroke="white"
            />
            <text
              x={xScale(cluster.x2) - 2}
              y={yScale(cluster.y1) + 5}
              fontSize={8}
              style={{
                fontWeight: 'bold',
                cursor: 'pointer',
                textAnchor: 'middle',
              }}
              fill="white"
            >
              X
            </text>
          </g>
        </g>
      ))}
    </SVG>
  );
};

export default withParentDimensions(DeckPlot);
