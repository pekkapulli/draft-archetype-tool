export interface DeckDatum {
  // [key: string]: string | number;
  ID: string;
  NMDS1: number;
  NMDS2: number;
  'Neighbours average win rate': number;
  Games: number;
  Wins: number;
  Losses: number;
  Neigh1: string;
  Neigh2: string;
  Neigh3: string;
  Neigh4: string;
  Neigh5: string;
  Neigh6: string;
  Neigh7: string;
  Neigh8: string;
  Neigh9: string;
  Neigh10: string;
  Neigh11: string;
  Neigh12: string;
  Neigh13: string;
  Neigh14: string;
  NeighWin1: number;
  NeighWin2: number;
  NeighWin3: number;
  NeighWin4: number;
  NeighWin5: number;
  NeighWin6: number;
  NeighWin7: number;
  NeighWin8: number;
  NeighWin9: number;
  NeighWin10: number;
  NeighWin11: number;
  NeighWin12: number;
  NeighWin13: number;
  NeighWin14: number;
  'Neigh Loss1': number;
  'Neigh Loss2': number;
  'Neigh Loss3': number;
  'Neigh Loss4': number;
  'Neigh Loss5': number;
  'Neigh Loss6': number;
  'Neigh Loss7': number;
  'Neigh Loss8': number;
  'Neigh Loss9': number;
  'Neigh Loss10': number;
  'Neigh Loss11': number;
  'Neigh Loss12': number;
  'Neigh Loss13': number;
  'Neigh Loss14': number;
}

export interface Clusters {
  [key: string]: Cluster;
}

export interface Cluster {
  id: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  decks: DeckDatum[];
}

export interface DeckList {
  [key: string]: number | string;
  ID: string;
}

export interface DeckDatumWithList extends DeckDatum {
  deckList?: DeckList;
}

export interface Card {
  name: string;
  averageAmount: number;
}

export interface ColorWinRateRow {
  Pair: string;
  Wins: number;
  Losses: number;
  Games: number;
  'Win Rate': number;
}

export interface ColorWinRates {
  [color: string]: number;
}
