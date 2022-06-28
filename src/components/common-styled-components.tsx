import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints, theme } from '../theme';

export const ArticleMain = styled.section`
  width: 100%;
  max-width: 1024px;
  padding: ${theme.spacing(4)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TextContent = styled.div`
  margin-top: ${theme.spacing(4)};
  max-width: 640px;
  width: 100%;
`;

export const WideTextContent = styled.div`
  width: 100%;
  margin-top: ${theme.spacing(3)};
`;

export const AppTitle = styled.h1`
  margin: 0 auto ${theme.spacing(5)} auto;
  text-align: center;
  ${theme.fontBold};
  ${theme.fontSize(7)};
  color: white;
  @media (max-width: ${breakpoints.tablet}px) {
    margin: 0 auto ${theme.spacing(4)} auto;
    ${theme.fontSize(5)};
  }
`;

export const AppSubTitle = styled.h2`
  ${theme.fontNormal};
  ${theme.fontSize(3)};
  margin: 0 auto ${theme.spacing(4)} auto;
  color: ${theme.colors.lightGrey};
  text-align: center;
  max-width: 720px;
  padding: 0 ${theme.spacing(6)};
  @media (max-width: ${breakpoints.tablet}px) {
    ${theme.fontSize(2)};
  }
  @media (max-width: ${breakpoints.mobile}px) {
    ${theme.fontSize(1)};
  }
`;

export const SectionTitle = styled.h2`
  ${theme.fontBold};
  color: ${theme.colors.blue};
  ${theme.fontSize(1)};
  margin: 0;
  padding: 0 0 ${theme.spacing(2)} 0;
  width: 100%;
`;

export const SmallTitle = styled.h3`
  ${theme.fontBold};
  color: ${theme.colors.blue};
  ${theme.fontSize(0)};
  padding: 0 0 ${theme.spacing(1)} 0;
  margin: 0;
  width: 100%;
`;

export const SmallSubtitle = styled.h4`
  ${theme.fontNormal};
  color: ${theme.colors.grey(2)};
  ${theme.fontSize(-1)};
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const SmallCardTitle = styled.h4`
  ${theme.fontBold};
  color: ${theme.colors.blue};
  ${theme.fontSize(-1)};
  padding: 0 0 ${theme.spacing(1)} 0;
  margin: 0;
  width: 100%;
  text-transform: uppercase;
`;

export const LeadText = styled.p`
  ${theme.fontNormal};
  ${theme.fontSize(1)};
  margin: 0 0 ${theme.spacing(3)} 0;
  line-height: 1.6;
`;

export const P = styled.p`
  ${theme.fontNormal};
  ${theme.fontSize(0)};
  margin: 0 0 ${theme.spacing(3)} 0;
  line-height: 1.6;
  max-width: 640px;
  width: 100%;
`;

export const ShareLink = styled(P)`
  ${theme.fontBold};
  color: ${theme.colors.blue};
  cursor: pointer;
`;

export const A = styled.a`
  color: ${theme.colors.blue};
  text-decoration: underline;
  text-decoration-color: ${theme.colors.blue};

  &:active {
    text-decoration-color: ${theme.colors.lightBlue};
  }
  &:visited {
    text-decoration-color: ${theme.colors.blue};
  }
`;

export const StrippedLink = styled(Link)`
  text-decoration: none;
  text-decoration-thickness: 0;
  color: initial;
  flex-grow: 0;
  display: inline-block;
  position: relative;
`;

export const Li = styled.li`
  ${theme.fontNormal};
  ${theme.fontSize(0)};
  line-height: 1.6;
  margin-bottom: ${theme.spacing(1)};
`;

export const Bold = styled.span`
  ${theme.fontBold};
`;

export const Italic = styled.span`
  font-style: italic;
`;

export const GraphTitle = styled.h4`
  ${theme.fontLabelBold};
  ${theme.fontSize(0)};
  margin: 0;
`;

export const GraphSubTitle = styled.h5`
  ${theme.fontNormal};
  ${theme.fontSize(-1)};
  margin: 0 0 ${theme.spacing(2)} 0;
`;

export const GraphSVG = styled.svg`
  margin-top: ${theme.spacing(2)};
`;

export const Caption = styled.div`
  width: 100%;
  ${theme.fontNormal};
  ${theme.fontSize(-1)};
  color: ${theme.colors.blue};
`;

export const TextComment = styled.span`
  color: red;
`;

export const Grid = styled.div<{ full?: boolean }>`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(220px, ${(p) => (p.full ? '100%' : '1fr')})
  );
  grid-gap: ${theme.spacing(3)};
  margin: ${theme.spacing(2)} 0;
  align-items: start;
`;

export const Legend = styled.div`
  margin: ${theme.spacing(0)} 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 40px;
`;

interface LegendItemProps {
  color: string;
  text: string;
}

const LegendItemElement = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-right: ${theme.spacing(1)};
  margin-top: ${theme.spacing(1)};
  ${theme.fontSize(-2)};
  ${theme.fontLabelBold};
`;

const ColorMarker = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  background-color: ${(p) => p.color};
  margin-right: ${theme.spacing(0)};
`;

export const LegendItem: React.FunctionComponent<LegendItemProps> = (props) => (
  <LegendItemElement>
    <ColorMarker color={props.color} />
    <div>{props.text}</div>
  </LegendItemElement>
);

export const Button = styled.div`
  background-color: ${theme.colors.blue};
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  color: white;
  ${theme.fontBold};
  ${theme.fontSize(-1)};
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  flex-grow: 0;
  flex-shrink: 1;
  text-align: center;
  justify-content: center;
  white-space: nowrap;
  display: inline-block;
  border-radius: 50%;

  & + & {
    margin-left: ${theme.spacing(2)};
  }
`;

export const SmallButton = styled(Button)`
  background-color: transparent;
  color: ${theme.colors.blue};
  padding: 0;
  ${theme.fontNormal};
`;

interface LinkButtonProps {
  to: string;
  children: React.ReactNode;
}

export const LinkButton: React.FunctionComponent<LinkButtonProps> = (props) => (
  <StrippedLink to={props.to}>
    <Button>{props.children}</Button>
  </StrippedLink>
);

export const TwoColumns = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 340px;
  grid-column-gap: ${theme.spacing(4)};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const SpeechBubble = ({ color }: { color: string }) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    version="1.1"
    style={{ flexShrink: 0 }}
  >
    <g stroke="none" strokeWidth="1" fill={color} fillRule="evenodd">
      <path d="M10,13.4705882 C15.5228475,13.4705882 20,12.5228475 20,7 C20,1.4771525 15.5228475,1 10,1 C4.4771525,1 0,1.4771525 0,7 C0,12.5228475 4.4771525,13.4705882 10,13.4705882 Z" />
      <path d="M8.51436178,13 L13.2791609,13 C12.3420395,14.6865942 11.5026635,15.8438944 10.7610331,16.4719003 C10.0194027,17.0999063 8.94626812,17.6092728 7.54162939,18 C8.06249512,17.2006553 8.38673925,16.4482313 8.51436178,15.742728 C8.64198431,15.0372247 8.64198431,14.1229821 8.51436178,13 Z" />
    </g>
  </svg>
);

export const Exclamation = ({ color }: { color: string }) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    version="1.1"
    style={{ flexShrink: 0 }}
  >
    <g stroke="none" fill="none" fillRule="evenodd">
      <circle fill={color} cx="10" cy="10" r="10"></circle>
      <path
        d="M11.2049689,12 L13,4 L7,4 L8.79503106,12 L11.2049689,12 Z M9.97468354,17 C10.5316456,17 11.0084388,16.8071279 11.4050633,16.4213836 C11.8016878,16.0356394 12,15.5660377 12,15.0125786 C12,14.4591195 11.8016878,13.9853249 11.4050633,13.591195 C11.0084388,13.197065 10.5316456,13 9.97468354,13 C9.43459916,13 8.97046414,13.197065 8.58227848,13.591195 C8.19409283,13.9853249 8,14.4591195 8,15.0125786 C8,15.5660377 8.19409283,16.0356394 8.58227848,16.4213836 C8.97046414,16.8071279 9.43459916,17 9.97468354,17 Z"
        fill="#FFFFFF"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export const Statistic = ({ color }: { color: string }) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 13.0005407 13.0005407"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M10.1536572,0.83941921 C10.518672,0.0957420724 11.4174444,-0.21122439 12.1611215,0.153790426 C12.861053,0.497333782 13.1741403,1.31368663 12.904237,2.02854787 L12.8467503,2.16125479 L8.38554152,11.2504721 L5.14230087,8.48313318 L2.77384895,12.2926929 C2.3619844,12.9547304 1.51839745,13.1845493 0.834135553,12.844461 L0.707847837,12.7739822 C0.045810353,12.3621177 -0.184008544,11.5185307 0.156079757,10.8342688 L0.226558529,10.7079811 L4.43798812,3.93846361 L7.39430087,6.46113318 L10.1536572,0.83941921 Z"
        id="Path-Copy"
        fill={color}
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export const GraphImage = styled.img<{ paddingTop?: number }>`
  width: 100%;
  ${(p) => (p.paddingTop ? `padding-top: ${p.paddingTop}px;` : '')}
`;
