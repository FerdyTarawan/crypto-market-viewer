import { Avatar, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { TFunction } from 'react-i18next';

import { TickerWithAsset } from 'types/ticker';
import { abbreviateNumber, toFixed } from 'utils/format';
import { formatCurrency } from 'utils/market';

export interface MarketListItemProps {
  data: TickerWithAsset;
  isLastItem: boolean;
  t: TFunction;
}

const MarketListItem: React.FC<MarketListItemProps> = ({
  data,
  isLastItem,
  t,
}) => {
  return (
    <Flex flexDir="column" my={2}>
      <Flex>
        <Avatar name={data.assetCode} size="xs" src={data.fullLogoUrl} />
        <Text fontWeight="bold" ml={1}>
          {data.assetCode}
        </Text>
        <Text color="gray.500" ml={1}>
          {data.assetName}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" mt={1}>
        <Text color="gray.500">{t('table.header.price')}</Text>
        <Text
          color={data.prevClosePrice > data.lastPrice ? 'red' : 'green'}
          fontWeight="semibold"
        >
          {formatCurrency(data.lastPrice, 'USD', 'en', false, {
            decimalPlaces: 2,
          })}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text color="gray.500">{t('table.header.dailyChange')}</Text>
        <Text
          color={data.priceChangePercent < 0 ? 'red' : 'green'}
          fontWeight="semibold"
        >{`${toFixed(data.priceChangePercent, 2)}%`}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text color="gray.500">{t('table.header.dailyVolume')}</Text>
        <Text fontWeight="semibold">{abbreviateNumber(data.volume)}</Text>
      </Flex>
      {!isLastItem && <Divider my={2} />}
    </Flex>
  );
};

export default MarketListItem;
