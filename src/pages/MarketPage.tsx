import {
  Avatar,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';

import LoadingFullscreen from 'components/LoadingFullscreen';
import MarketList from 'components/MarketList';
import MarketTable from 'components/MarketTable';
import Tags from 'components/Tags';
import { DEFAULT_FILTER_TAG } from 'constants/filter';
import type { State } from 'hooks';
import { useMarket, useStore } from 'hooks';
import { TickerWithAsset } from 'types/ticker';
import { abbreviateNumber } from 'utils/format';
import { formatCurrency } from 'utils/market';

const SELECTOR = (state: State) => ({
  filterTag: state.filterTag,
  setFilterTag: state.setFilterTag,
});

const MarketPage: React.FC = () => {
  const { data, isLoading } = useMarket('USDT');
  const { filterTag, setFilterTag } = useStore(SELECTOR);
  const { t } = useTranslation();
  const [pageIndexState, setPageIndexState] = useState<number>(0);
  const [filter, setFilter] = useState('');
  const filteredData = useMemo(
    () =>
      data
        ?.filter(
          (datum) =>
            datum.assetCode.toLowerCase().includes(filter.toLowerCase()) ||
            datum.assetName.toLowerCase().includes(filter.toLowerCase()),
        )
        .filter((datum) =>
          filterTag === '' ? true : datum.tags.includes(filterTag),
        ) ?? [],
    [data, filter, filterTag],
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
            {`${row.priceChangePercent.toFixed(2)}%`}
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
    [],
  );

  const [isMobile] = useMediaQuery('(max-width: 480px)');

  if (isLoading && data === undefined) {
    return <LoadingFullscreen />;
  }

  return (
    <Flex flexDir="column" px={10}>
      <Heading my={4}>{t('title')}</Heading>

      <Tags
        onSelectTag={setFilterTag}
        options={DEFAULT_FILTER_TAG}
        selectedTag={filterTag}
      />

      <Input
        my={4}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={t('table.filter.placeholder')}
        size="md"
        value={filter}
        variant="outline"
      />

      {isMobile ? (
        <MarketList data={filteredData} />
      ) : (
        <MarketTable
          columns={columns}
          data={filteredData}
          indexState={pageIndexState}
          setIndexState={setPageIndexState}
        />
      )}
    </Flex>
  );
};

export default MarketPage;
