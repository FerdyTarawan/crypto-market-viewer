export interface Ticker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  prevClosePrice: string;
  lastPrice: string;
  volume: string;
}

export type TickerDTO = Ticker;

export type TickerResponse = TickerDTO[];
