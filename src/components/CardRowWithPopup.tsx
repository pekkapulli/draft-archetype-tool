import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import styled from 'styled-components';
import { theme } from '../theme';
import { Card } from '../types';

interface CardRowWithPopupProps {
  card: Card,
  titleWidth?: number,
  chartWidth?: number,
  averageAmountWidth?: number,
  amountWidth?: number,
  amount?: number,
  inDeckList: boolean,
  deckListCard?: Object
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

export const CardRowWithPopup = (props: CardRowWithPopupProps) => {
  const {
    card,
    titleWidth,
    chartWidth,
    averageAmountWidth,
    amountWidth,
    amount,
    inDeckList
  } = props;
  const [mousedOver, setMousedOver] = useState<boolean>(false);
  const [imageLink, setImageLink] = useState<string>();

  const fetchCardImage = async (card: Card) => {
    const fetchableName = card.name.replace(/\s+/g, '+');
    const sfCardData = await axios.get(`https://api.scryfall.com/cards/named?exact=${fetchableName}`);
    const link: string = sfCardData.data.image_uris.normal;
    setImageLink(link);
  };

  useEffect(() => {
    if (mousedOver) {
      fetchCardImage(card);
    }
  }, [mousedOver]);

  return (
    <Popup trigger={
      inDeckList?
      <CardRow key={card.name}>
        <CardAmount>{amount}</CardAmount>
        <CardName>{card.name}</CardName>
      </CardRow>
      :
      <CardRow  key={card.name} onMouseOver={() => setMousedOver(true)}>
        <Name style={{ width: titleWidth }}>{card.name}</Name>
          <AmountBarBG style={{ width: chartWidth }}>
            <Amount style={{ width: `${amountWidth}px` }}>
              {card.averageAmount.toFixed(1)}
            </Amount>
            <AverageAmount
              style={{ width: averageAmountWidth }}
            />
          </AmountBarBG>
      </CardRow>
      }
      position={'left center'}
      on={['hover']}
      key={card.name}>
        {mousedOver && <img src={imageLink} style={{height: '278px', width: '200px'}}></img>}
    </Popup>
  )

};