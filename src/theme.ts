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
  blue: '#152660',
  purple: '#42355d',
  lightBlue: '#b3d9dd',
  yellow: '#f6e154',
  darkRed: '#813131',
  red: '#db948e',
  lightRed: '#ff7f7f',
  midGrey: '#7c7f85',
  lightGrey: '#dde4ed',
};

export const getFill = (key: string) => {
  switch (key) {
    case 'tili_nollilla':
      return colors.red;
    case 'opintoraha':
    case 'opintoraha_kumulatiivinen':
    case 'opintoraha_ka':
    case 'opintoraha_ka_kumulatiivinen':
    case 'opiskelija':
      return colors.lightGrey;
    case 'tyottomyysetuus':
    case 'tyottomyysetuus_kumulatiivinen':
    case 'tyottomyysetuus_ka':
    case 'tyottomyysetuus_ka_kumulatiivinen':
    case 'tili_kaytossa':
    case 'tyoton':
      return colors.yellow;
    case 'vanhempainetuudet':
    case 'vanhempainetuudet_ka':
      return colors.midGrey;
    case 'tyotulot_yhteensa':
    case 'tyotulot_yhteensa_kumulatiivinen':
    case 'tyotulot_yhteensa_ka':
    case 'tyotulot_yhteensa_ka_kumulatiivinen':
    case 'tyollinen':
    case 'tili_taynna':
      return colors.blue;
    case 'perustilinostoOP_rajoitettu_kynnys':
    case 'etuusnostoOpintorahaKorotettu_kynnys':
      return colors.blue;
    default:
      return colors.midGrey;
  }
};

export const theme = {
  fontTitle: `
    font-family: "Source Serif Pro", serif;
    font-style: normal;
    font-weight: bold;
  `,
  fontBold: `
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: bold;
  `,
  fontNormal: `
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: normal
  `,
  fontLabel: `
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: normal
  `,
  fontLabelBold: `
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: bold
  `,
  spacing,
  spacingNumber,
  fontSize,
  fontSizeNumber,
  colors,
  getFill,
};

export const breakpoints = {
  mobile: 480,
  tablet: 800,
  desktop: 1220,
};
