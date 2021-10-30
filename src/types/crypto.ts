export type CryptoCurrencyAssetDTO = {
  id: string;
  assetCode: string;
  assetName: string;
  unit: string;
  commisionRate: number;
  freeAuditWithdrawAmt: number;
  freeUserChargeAmount: number;
  createTime: number;
  test: number;
  gas: number | null;
  isLegalMoney: boolean;
  reconciliationAmount: number;
  seqNum: number;
  chineseName: string;
  cnLink: string;
  enLink: string;
  logoUrl: string;
  fullLogoUrl: string;
  supportMarket: string | null;
  feeReferenceAsset: number | null;
  feeRate: number | null;
  feeDigit: number | null;
  assetDigit: number | null;
  trading: boolean;
  tags: string[];
  plateType: string;
  etf: boolean;
  isLedgerOnly: boolean;
};

export type CryptoCurrencyAsset = Pick<
  CryptoCurrencyAssetDTO,
  'id' | 'assetCode' | 'assetName' | 'logoUrl' | 'fullLogoUrl' | 'tags'
>;

export interface CryptoAssetResponse {
  code: string;
  message: string | null;
  messageDetail: string | null;
  data: CryptoCurrencyAssetDTO[];
}
