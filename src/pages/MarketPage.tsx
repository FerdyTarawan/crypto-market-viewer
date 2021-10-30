import { Avatar, Flex, Input, Text, useMediaQuery } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';

import LoadingFullscreen from 'components/LoadingFullscreen';
import MarketList from 'components/MarketList';
import MarketTable from 'components/MarketTable';
import useMarket from 'hooks/useMarket';
import { TickerWithAsset } from 'types/ticker';
import { abbreviateNumber, toFixed } from 'utils/format';
import { formatCurrency } from 'utils/market';

const MarketPage: React.FC = () => {
  const { data, isLoading } = useMarket('USDT');
  const { t } = useTranslation();
  const [pageIndexState, setPageIndexState] = useState<number>(0);
  const [filter, setFilter] = useState('');
  const filteredData = useMemo(
    () =>
      data?.filter(
        (datum) =>
          datum.assetCode.toLowerCase().includes(filter) ||
          datum.assetName.toLowerCase().includes(filter),
      ),
    [data, filter],
  );
  const columns = useMemo<Column<TickerWithAsset>[]>(
    () => [
      {
        Header: t<string>('table.header.name'),
        accessor: (row) => (
          <Flex flexDir="row">
            <Avatar name={row.assetCode} size="md" src={row.fullLogoUrl} />
            <Flex flexDir="column" ml={4} mt={1}>
              <Text fontWeight="bold">{row.assetCode}</Text>
              <Text>{row.assetName}</Text>
            </Flex>
          </Flex>
        ),
      },
      {
        Header: t<string>('table.header.price'),
        accessor: (row) => (
          <Text
            color={row.prevClosePrice > row.lastPrice ? 'red' : 'green'}
            fontWeight="semibold"
          >
            {formatCurrency(row.lastPrice, 'USD', 'en', false, {
              decimalPlaces: 2,
            })}
          </Text>
        ),
      },
      {
        Header: t<string>('table.header.dailyChange'),
        accessor: (row) => (
          <Text
            color={row.priceChangePercent < 0 ? 'red' : 'green'}
            fontWeight="semibold"
          >
            {`${toFixed(row.priceChangePercent, 2)}%`}
          </Text>
        ),
      },
      {
        Header: t<string>('table.header.dailyVolume'),
        accessor: (row) => (
          <Text fontWeight="semibold">{abbreviateNumber(row.volume)}</Text>
        ),
      },
    ],
    [filteredData],
  );
  const [isMobile] = useMediaQuery('(max-width: 480px)');

  if (isLoading && data === undefined) {
    return <LoadingFullscreen />;
  }

  return (
    <Flex flexDir="column" overflowX="auto" p={10}>
      <Input
        mb="4"
        onChange={(e) => setFilter(e.target.value)}
        placeholder={t('table.filter.placeholder')}
        size="md"
        value={filter}
        variant="outline"
      />
      {isMobile ? (
        <MarketList data={filteredData ?? []} />
      ) : (
        <MarketTable
          columns={columns}
          data={filteredData ?? []}
          indexState={pageIndexState}
          setIndexState={setPageIndexState}
        />
      )}
    </Flex>
  );
};

export default MarketPage;
