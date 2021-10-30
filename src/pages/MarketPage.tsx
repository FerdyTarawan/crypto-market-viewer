import { Text } from '@chakra-ui/layout';
import React, { useEffect } from 'react';

import { ASSET_API_URL, TICKER_API_URL } from 'constants/url';
import { binanceApi, binanceAssetApi } from 'utils/api';

const MarketPage: React.FC = () => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    binanceApi.get(TICKER_API_URL).then((val) => console.log(val));
    // eslint-disable-next-line no-console
    binanceAssetApi.get(ASSET_API_URL).then((val) => console.log(val));
  }, []);

  return <Text>Market Page</Text>;
};

export default MarketPage;
