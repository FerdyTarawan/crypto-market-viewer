import { CryptoCurrencyAsset } from 'types/crypto';

export type TickerDTO = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
};

export type Ticker = {
  symbol: string;
  priceChange: number;
  priceChangePercent: number;
  prevClosePrice: number;
  lastPrice: number;
  volume: number;
};

export type TickerWithAsset = Ticker & CryptoCurrencyAsset;

export type TickerResponse = TickerDTO[];
