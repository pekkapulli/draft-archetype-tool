const ratio = 1.25;
const baseFontSize = 16;

const fontSizeNumber = (step: number): number => {
  const size = baseFontSize * Math.pow(ratio, step);
  return size;
};

const fontSize = (step: number): string => {
  const size = fontSizeNumber(step);
  return `font-size: ${size}px`;
};

const spacingRatio = 1.618;
const spacingBase = 4;

const spacingNumber = (step: number): number => {
  return spacingBase * Math.pow(spacingRatio, step);
};

const spacing = (step: number): string => {
  return `${spacingNumber(step)}px`;
};

const greys = ['#191919', '#444', '#888', '#ccc', '#eee', '#f4f4f4'];

const grey = (step: number): string => {
  return step < 0 ? 'black' : step >= greys.length ? 'white' : greys[step];
};

export const colors = {
  black: 'black',
  white: 'white',
  grey,
  blackText: '#333333',
  darkBlue: '#387177',
  blue: '#0A3182',
  purple: '#42355d',
  lightBlue: '#D8DFEC',
  yellow: '#f6e154',
  lightestRed: '#FFE5FB',
  midGrey: '#7c7f85',
  lightGrey: '#dde4ed',
};

export const theme = {
  fontTitle: `
    font-family: 'Abril Fatface', sans-serif;
    font-style: normal;
    font-weight: normal;
  `,
  fontBold: `
    font-family: "Rubik", sans-serif;
    font-style: normal;
    font-weight: bold;
  `,
  fontNormal: `
    font-family: "Rubik", sans-serif;
    font-style: normal;
    font-weight: normal
  `,
  fontLabel: `
    font-family: "Rubik", sans-serif;
    font-style: normal;
    font-weight: normal
  `,
  fontLabelBold: `
    font-family: "Rubik", sans-serif;
    font-style: normal;
    font-weight: bold
  `,
  spacing,
  spacingNumber,
  fontSize,
  fontSizeNumber,
  colors,
};

export const breakpoints = {
  mobile: 480,
  tablet: 800,
  desktop: 1220,
};
