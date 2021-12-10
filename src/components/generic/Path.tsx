import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PathElement = styled.path`
  transition: opacity 2s;
`;

export const Path: React.FunctionComponent<
  React.SVGAttributes<SVGPathElement>
> = (props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);
  return <PathElement {...props} style={{ opacity: visible ? 1 : 0 }} />;
};
