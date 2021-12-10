import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import {
  Button,
  LinkButton,
  SectionTitle,
  SmallTitle,
  SmallCardTitle,
} from './common-styled-components';
import InfoText from './InfoText';

interface TitleProps {
  size: 'large' | 'small' | 'card' | 'smallCard';
  buttons?: {
    text: string;
    link?: string;
    infoText?: string;
  }[];
  inView?: boolean;
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
    props.size === 'large' ? (
      <SectionTitle>{props.children}</SectionTitle>
    ) : props.size === 'smallCard' ? (
      <SmallCardTitle>{props.children}</SmallCardTitle>
    ) : (
      <SmallTitle>{props.children}</SmallTitle>
    );

  return (
    <TitleContainer
      border={
        props.size === 'card' ? theme.colors.grey(3) : theme.colors.grey(5)
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
            {button.infoText ? (
              <InfoText side="left" inView={props.inView === true}>
                {button.infoText}
              </InfoText>
            ) : undefined}
            {button.link ? (
              <LinkButton key={button.text} to={button.link}>
                {button.text}
              </LinkButton>
            ) : (
              <Button key={button.text}>{button.text}</Button>
            )}
          </ButtonContainer>
        ))}
      </Buttons>
    </TitleContainer>
  );
};
