import React, { useLayoutEffect, useRef, useState } from 'react';

export const withParentDimensions = <Props extends object>(
  Component: React.ComponentType<Props>
): React.ComponentType<
  Pick<Props, Exclude<keyof Props, keyof ParentDimensionsProps>>
> => {
  const ReturnComponent = (props: Props) => {
    const [targetRef, parentDimensions] = useParentDimensions();

    return (
      <div ref={targetRef} style={{ width: '100%', boxSizing: 'border-box' }}>
        {parentDimensions && (
          <Component {...props} parentDimensions={parentDimensions} />
        )}
      </div>
    );
  };

  return ReturnComponent as React.ComponentType<
    Pick<Props, Exclude<keyof Props, keyof ParentDimensionsProps>>
  >;
};

export const useParentDimensions = (): [
  React.RefObject<HTMLDivElement>,
  { width: number; height: number }
] => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const solveDimensions = () => {
    if (targetRef.current && targetRef.current.parentElement) {
      const {
        width: widthFromStyle,
        height: heightFromStyle,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
      } = getComputedStyle(targetRef.current.parentElement);
      const p = (s: string | null) => (s ? parseFloat(s) : 0);
      const elementWidth = p(widthFromStyle) - p(paddingLeft) - p(paddingRight);
      const elementHeight =
        p(heightFromStyle) - p(paddingTop) - p(paddingBottom);

      if (width !== elementWidth) {
        setWidth(elementWidth);
      }
      if (height !== elementHeight) {
        setHeight(elementHeight);
      }
    }
  };

  useLayoutEffect(() => {
    solveDimensions();
    window.addEventListener('resize', solveDimensions, false);
    return () => {
      window.removeEventListener('resize', solveDimensions);
    };
  });
  return [targetRef, { width, height }];
};

export interface ParentDimensionsProps {
  parentDimensions: { width: number; height: number };
}
