export interface CryptoCurrencyAsset {
  id: string;
  assetCode: string;
  assetName: string;
  logoUrl: string;
  fullLogoUrl: string;
  tags: string[];
}

export type CryptoCurrencyAssetDTO = CryptoCurrencyAsset;

export interface CryptoResponse {
  code: string;
  message: string | null;
  messageDetail: string | null;
  data: CryptoCurrencyAssetDTO[];
}
