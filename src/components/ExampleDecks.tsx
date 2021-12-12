import { chain, pickBy } from 'lodash';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useDeepMemo } from '../hooks/useDeepMemo';
import { theme } from '../theme';
import { DeckDatumWithList } from '../types';
import { P, SmallTitle } from './common-styled-components';

interface DeckListsProps {
  deckLists: DeckDatumWithList[];
}

const ExampleDecksContainer = styled.div`
  margin-top: ${theme.spacing(4)};
`;

const Lists = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  flex-wrap: nowrap;
  width: 100%;
  align-items: flex-start;
`;

const List = styled.div`
  margin-right: ${theme.spacing(2)};
  width: 290px;
  flex-shrink: 0;
`;

const CardRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardAmount = styled.div`
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  background-color: ${theme.colors.blue};
  color: white;
  ${theme.fontNormal};
  margin-right: 1px;
  margin-bottom: 1px;
  width: 30px;
  ${theme.fontSize(-1)};
  white-space: nowrap;
  text-align: center;
`;

const CardName = styled(CardAmount)`
  width: auto;
  text-align: left;
  flex-grow: 1;
`;

export const ExampleDecks = ({ deckLists }: DeckListsProps) => {
  const lists = useDeepMemo(
    () =>
      deckLists
        .filter((list) => list.Wins === 7)
        .map((list) => {
          const deckList =
            list.deckList !== undefined
              ? chain(Object.keys(list.deckList))
                  .filter((card) => card !== 'ID' && list.deckList![card] > 0)
                  .map((card) => ({
                    name: card,
                    amount: list.deckList![card],
                  }))
                  .orderBy('amount', 'desc')
                  .valueOf()
              : [];
          return {
            ...list,
            deckList,
          };
        }),
    [deckLists]
  );
  return (
    <ExampleDecksContainer>
      <SmallTitle>7 win lists (scroll for more &gt;)</SmallTitle>
      <Lists>
        {lists.length === 0 ? (
          <P>No 7 win lists to show</P>
        ) : (
          lists.map((list, i) => (
            <List key={`list-${i}`}>
              {list.deckList.map((card) => (
                <CardRow key={card.name}>
                  <CardAmount>{card.amount}</CardAmount>
                  <CardName>{card.name}</CardName>
                </CardRow>
              ))}
            </List>
          ))
        )}
      </Lists>
    </ExampleDecksContainer>
  );
};
