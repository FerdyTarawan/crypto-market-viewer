import { CryptoCurrencyAsset } from 'types/crypto';

export { formatCurrency, isCrypto } from '@coingecko/cryptoformat';

export const findCryptoAsset = (
  assets: CryptoCurrencyAsset[],
  symbol: string,
  quote: string,
): CryptoCurrencyAsset | undefined =>
  assets.find((asset) => symbol.replace(quote, '') === asset.assetCode);

export const isQuoteMatch = (symbol: string, quote: string) =>
  symbol.toLowerCase().endsWith(quote.toLowerCase());
