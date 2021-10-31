import { CryptoCurrencyAsset } from 'types/crypto';
import { findCryptoAsset, isQuoteMatch } from 'utils/market';

const DUMMY_CRYPTO_ASSETS: CryptoCurrencyAsset[] = [
  {
    assetCode: 'BTC',
    assetName: 'Bitcoin',
    fullLogoUrl:
      'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/btc.png',
    id: '1',
    logoUrl:
      'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/btc.png',
    tags: ['pow'],
  },
  {
    assetCode: 'ETH',
    assetName: 'Ethereum',
    fullLogoUrl:
      'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/eth.png',
    id: '2',
    logoUrl:
      'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/eth.png',
    tags: ['pow'],
  },
  {
    assetCode: 'ADA',
    assetName: 'Cardano',
    fullLogoUrl:
      'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/ada.png',
    id: '3',
    logoUrl:
      'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/ada.png',
    tags: ['pos'],
  },
  {
    assetCode: 'DOT',
    assetName: 'Polkadot',
    fullLogoUrl:
      'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/dot.png',
    id: '4',
    logoUrl:
      'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/dot.png',
    tags: ['pos'],
  },
];

describe(isQuoteMatch, () => {
  it('should return correct result', () => {
    expect(isQuoteMatch('BTCUSDT', 'USDT')).toBe(true);
    expect(isQuoteMatch('ETHUSDT', 'USDT')).toBe(true);
    expect(isQuoteMatch('DOTUSDT', 'USDT')).toBe(true);
    expect(isQuoteMatch('BTCUSDC', 'USDT')).toBe(false);
    expect(isQuoteMatch('ETHAUD', 'USDT')).toBe(false);
    expect(isQuoteMatch('ETHBTC', 'USDT')).toBe(false);
    expect(isQuoteMatch('ETHUSDC', 'USDT')).toBe(false);
    expect(isQuoteMatch('ETHUSDC', 'USDC')).toBe(true);
  });
});

describe(findCryptoAsset, () => {
  it('should return correct result', () => {
    expect(findCryptoAsset(DUMMY_CRYPTO_ASSETS, 'ADAUSDT', 'USDT')).toEqual(
      DUMMY_CRYPTO_ASSETS[2],
    );
    expect(findCryptoAsset(DUMMY_CRYPTO_ASSETS, 'BTCUSDC', 'USDC')).toEqual(
      DUMMY_CRYPTO_ASSETS[0],
    );
    expect(findCryptoAsset(DUMMY_CRYPTO_ASSETS, 'DOTAUD', 'AUD')).toEqual(
      DUMMY_CRYPTO_ASSETS[3],
    );
    expect(findCryptoAsset(DUMMY_CRYPTO_ASSETS, 'ETHBTC', 'BTC')).toEqual(
      DUMMY_CRYPTO_ASSETS[1],
    );
    expect(
      findCryptoAsset(DUMMY_CRYPTO_ASSETS, 'BTTUSDT', 'USDT'),
    ).toBeUndefined();
  });
});
