import { CryptoCurrencyAsset, CryptoCurrencyAssetDTO } from 'types/crypto';
import {
  Ticker,
  TickerDTO,
  TickerResponse,
  TickerWithAsset,
} from 'types/ticker';
import { findCryptoAsset, isQuoteMatch } from 'utils/market';

export const transformFromAssetDTO = (
  dto: CryptoCurrencyAssetDTO,
): CryptoCurrencyAsset => ({
  assetCode: dto.assetCode,
  assetName: dto.assetName,
  fullLogoUrl: dto.fullLogoUrl,
  id: dto.id,
  logoUrl: dto.logoUrl,
  tags: dto.tags,
});

export const transformFromTickerDto = (dto: TickerDTO): Ticker => ({
  lastPrice: Number(dto.lastPrice),
  prevClosePrice: Number(dto.prevClosePrice),
  priceChange: Number(dto.priceChange),
  priceChangePercent: Number(dto.priceChangePercent),
  symbol: dto.symbol,
  volume: Number(dto.quoteVolume),
});

export const transformFromTickerReponse =
  (cryptoAssets: CryptoCurrencyAsset[], quote: string) =>
  (response: TickerResponse): TickerWithAsset[] =>
    response
      .filter(
        (dto) =>
          findCryptoAsset(cryptoAssets, dto.symbol, quote) !== undefined &&
          isQuoteMatch(dto.symbol, quote),
      )
      .map((dto) => ({
        ...transformFromTickerDto(dto),
        ...findCryptoAsset(cryptoAssets, dto.symbol, quote)!,
      }));
