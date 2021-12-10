import React, { useEffect, useRef, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';
import { theme } from '../../theme';
import chroma from 'chroma-js';
import {
  ParentDimensionsProps,
  withParentDimensions,
} from './withParentDimensions';

const Box = styled.div`
  padding: ${theme.spacing(4)};
  margin: ${theme.spacing(4)} 0;
  width: 100%;
  background-color: ${theme.colors.lightGrey};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxContent = styled.div`
  position: relative;
  overflow: hidden;
  transition: height 1s ease;
`;

const hex2rgba = (hex: string, alpha = 1) => chroma(hex).alpha(alpha).css();

const Fade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    ${hex2rgba(theme.colors.lightGrey, 0)},
    ${hex2rgba(theme.colors.lightGrey, 0)},
    ${hex2rgba(theme.colors.lightGrey)}
  );
  transition: opacity 1s linear;
  pointer-events: none;
`;

const ToggleButton = styled.button`
  padding: ${theme.spacing(1)} ${theme.spacing(3)};
  margin-top: ${theme.spacing(2)};
  background-color: transparent;
  border: none;
  ${theme.fontBold};
  ${theme.fontSize(0)};
  color: ${theme.colors.blue};
  cursor: pointer;
`;

const FactBox: React.FunctionComponent<
  { collapsed?: boolean } & ParentDimensionsProps
> = (props) => {
  const COLLAPSED_HEIGHT = 130;
  const contentRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const [collapsed, setCollapsed] = useState<boolean>(props.collapsed === true);
  const [contentHeight, setContentHeight] = useState<number>(
    contentRef.current?.clientHeight || COLLAPSED_HEIGHT
  );

  const updateContentHeight = (isCollapsed: boolean) => {
    const newHeight = isCollapsed
      ? COLLAPSED_HEIGHT
      : contentRef.current?.clientHeight || 0;
    if (newHeight !== contentHeight) {
      setContentHeight(newHeight);
    }
  };

  const toggleCollapse = () => {
    const newCollapseState = !collapsed;
    updateContentHeight(newCollapseState);
    setCollapsed(newCollapseState);
  };

  useEffect(() => {
    updateContentHeight(collapsed);
  });

  return (
    <Box>
      <BoxContent style={{ height: props.collapsed ? contentHeight : 'auto' }}>
        <div ref={contentRef}>{props.children}</div>
        <Fade style={{ opacity: collapsed ? '1' : '0' }}></Fade>
      </BoxContent>
      {collapsed ? (
        <ToggleButton onClick={() => toggleCollapse()}>
          Näytä lisää
        </ToggleButton>
      ) : undefined}
    </Box>
  );
};

export default withParentDimensions(FactBox);
