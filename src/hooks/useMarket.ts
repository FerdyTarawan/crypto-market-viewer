import { secondsToMilliseconds } from 'date-fns';
import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';

import { ASSET_API_URL, TICKER_API_URL } from 'constants/url';
import { useStore } from 'hooks/useStore';
import type { CryptoAssetResponse } from 'types/crypto';
import type { TickerResponse, TickerWithAsset } from 'types/ticker';
import { binanceApi, binanceAssetApi } from 'utils/api';
import {
  transformFromAssetDTO,
  transformFromTickerReponse,
} from 'utils/transform';

const fetchCryptoAsset = async (): Promise<CryptoAssetResponse> => {
  const response = await binanceAssetApi.get<CryptoAssetResponse>(
    ASSET_API_URL,
  );

  if (!response.ok) {
    throw new Error(response.problem);
  }

  return response.data!;
};

const fetchMarketTicker = async (): Promise<TickerResponse> => {
  if (useStore.getState().cryptoAsset.length === 0) {
    const assetsDto = await fetchCryptoAsset();
    const assets = assetsDto.data.map((dto) => transformFromAssetDTO(dto));
    useStore.getState().addCryptoAsset(assets);
  }

  const response = await binanceApi.get<TickerResponse>(TICKER_API_URL);

  if (!response.ok) {
    throw new Error(response.problem);
  }

  return response.data!;
};

const useMarket = (
  currency: string,
): UseQueryResult<TickerWithAsset[], unknown> => {
  const assets = useStore.getState().cryptoAsset;
  const queryInfo = useQuery(['market', { currency }], fetchMarketTicker, {
    refetchInterval: secondsToMilliseconds(10000),
    select: transformFromTickerReponse(assets, currency),
  });

  return queryInfo;
};

export default useMarket;
