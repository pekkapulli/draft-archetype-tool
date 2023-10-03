export interface DeckDatum {
  // [key: string]: string | number;
  ID: string;
  NMDS1: number;
  NMDS2: number;
  'Neighbours average win rate': number;
  Games: number;
  Wins: number;
  Losses: number;
  Neigh0: string;
  Neigh1: string;
  Neigh2: string;
  Neigh3: string;
  Neigh4: string;
  Neigh5: string;
  Neigh6: string;
  Neigh7: string;
  Neigh8: string;
  Neigh9: string;
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
