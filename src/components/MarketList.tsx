import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import MarketListItem from 'components/MarketListItem';
import { TickerWithAsset } from 'types/ticker';

export interface MarketListProps {
  data: TickerWithAsset[];
}

const MarketList: React.FC<MarketListProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Flex flexDir="column" p={4}>
      {data.map((datum, index) => (
        <MarketListItem
          key={datum.id}
          data={datum}
          isLastItem={index !== data.length - 1}
          t={t}
        />
      ))}
    </Flex>
  );
};

export default MarketList;
