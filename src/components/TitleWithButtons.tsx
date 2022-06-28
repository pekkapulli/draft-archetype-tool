import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import {
  Button,
  SectionTitle,
  SmallTitle,
  SmallCardTitle,
} from './common-styled-components';

interface TitleProps {
  size: 'large' | 'small' | 'card' | 'smallCard' | 'largeCard';
  buttons?: {
    text: string;
    onClick: () => void;
  }[];
  inView?: boolean;
  children: React.ReactNode;
}

const TitleContainer = styled.div<{
  border: string;
  marginTop: string;
  marginBottom: string;
}>`
  width: 100%;
  border-bottom: 1px solid ${(p) => p.border};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(p) => p.marginTop};
  margin-bottom: ${(p) => p.marginBottom};
`;

const Buttons = styled.div`
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: ${theme.spacing(1)};
`;

const ButtonContainer = styled.div`
  position: relative;
`;

export const TitleWithButtons: React.FunctionComponent<TitleProps> = (
  props
) => {
  const title =
    props.size === 'large' || props.size === 'largeCard' ? (
      <SectionTitle>{props.children}</SectionTitle>
    ) : props.size === 'smallCard' ? (
      <SmallCardTitle>{props.children}</SmallCardTitle>
    ) : (
      <SmallTitle>{props.children}</SmallTitle>
    );

  return (
    <TitleContainer
      border={
        props.size === 'card' || props.size === 'largeCard'
          ? theme.colors.grey(3)
          : theme.colors.grey(5)
      }
      marginTop={
        props.size === 'large'
          ? theme.spacing(4)
          : props.size === 'small'
          ? theme.spacing(4)
          : '0px'
      }
      marginBottom={
        props.size === 'large' ? theme.spacing(3) : theme.spacing(1)
      }
    >
      {title}
      <Buttons>
        {props.buttons?.map((button) => (
          <ButtonContainer key={button.text}>
            <Button
              key={button.text}
              onClick={button.onClick ? () => button.onClick() : undefined}
            >
              {button.text}
            </Button>
          </ButtonContainer>
        ))}
      </Buttons>
    </TitleContainer>
  );
};
