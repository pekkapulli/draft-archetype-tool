import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CircleElement = styled.circle`
  transition: opacity 2s, r 1s;
`;

export const Circle: React.FunctionComponent<
  React.SVGAttributes<SVGCircleElement>
> = (props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);
  return <CircleElement {...props} style={{ opacity: visible ? 1 : 0 }} />;
};
