import { create } from 'apisauce';

const { REACT_APP_ASSET_BASE_URL, REACT_APP_BASE_URL } = process.env;

export const binanceApi = create({
  baseURL: REACT_APP_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const binanceAssetApi = create({
  baseURL: REACT_APP_ASSET_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
