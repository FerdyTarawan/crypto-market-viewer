/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Column, usePagination, useTable } from 'react-table';

import LoadingFullscreen from 'components/LoadingFullscreen';
import useMarket from 'hooks/useMarket';
import { TickerWithAsset } from 'types/ticker';
import { abbreviateNumber, toFixed } from 'utils/format';
import { formatCurrency } from 'utils/market';

const MarketPage: React.FC = () => {
  const { data, isLoading } = useMarket('USDT');
  const { t } = useTranslation();
  const [pageIndexState, setPageIndexState] = useState(0);
  const columns = useMemo<Column<TickerWithAsset>[]>(
    () => [
      {
        Header: t<string>('table.header.name'),
        accessor: (row) => (
          <Flex flexDir="row">
            <Avatar name={row.assetCode} size="md" src={row.fullLogoUrl} />
            <Flex flexDir="column" ml={4} mt={1}>
              <Text>{row.assetCode}</Text>
              <Text>{row.assetName}</Text>
            </Flex>
          </Flex>
        ),
      },
      {
        Header: t<string>('table.header.price'),
        accessor: (row) => (
          <Text color={row.prevClosePrice > row.lastPrice ? 'red' : 'green'}>
            {formatCurrency(row.lastPrice, 'USD', 'en', false, {
              decimalPlaces: 2,
            })}
          </Text>
        ),
      },
      {
        Header: t<string>('table.header.dailyChange'),
        accessor: (row) => (
          <Text color={row.priceChangePercent < 0 ? 'red' : 'green'}>
            {`${toFixed(row.priceChangePercent, 2)}%`}
          </Text>
        ),
      },
      {
        Header: t<string>('table.header.dailyVolume'),
        accessor: (row) => <Text>{abbreviateNumber(row.volume)}</Text>,
      },
    ],
    [data],
  );

  const {
    canNextPage,
    canPreviousPage,
    getTableBodyProps,
    getTableProps,
    gotoPage,
    headerGroups,
    nextPage,
    page,
    pageCount,
    prepareRow,
    previousPage,
  } = useTable<TickerWithAsset>(
    {
      columns,
      data: data ?? [],
      initialState: { pageIndex: pageIndexState, pageSize: 50 },
    },
    usePagination,
  );

  const navigateToPage = useCallback(
    (index: number) => {
      setPageIndexState(index);
      gotoPage(index);
    },
    [gotoPage, setPageIndexState],
  );

  const navigateToNextPage = useCallback(() => {
    setPageIndexState((prevState) => prevState + 1);
    nextPage();
  }, [nextPage, setPageIndexState]);

  const navigateToPreviousPage = useCallback(() => {
    setPageIndexState((prevState) => prevState - 1);
    previousPage();
  }, [previousPage, setPageIndexState]);

  if (isLoading && data === undefined) {
    return <LoadingFullscreen />;
  }

  return (
    <Box p={10}>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Flex alignItems="center" justifyContent="center" m={4}>
        <Flex m={4}>
          <Tooltip label="First Page">
            <IconButton
              aria-label="First Page"
              icon={<ArrowLeftIcon h={3} w={3} />}
              isDisabled={!canPreviousPage}
              mr={4}
              onClick={() => navigateToPage(0)}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              aria-label="Previous Page"
              icon={<ChevronLeftIcon h={6} w={6} />}
              isDisabled={!canPreviousPage}
              onClick={navigateToPreviousPage}
            />
          </Tooltip>
        </Flex>

        <Flex m={4}>
          <Tooltip label="Next Page">
            <IconButton
              aria-label="Next Page"
              icon={<ChevronRightIcon h={6} w={6} />}
              isDisabled={!canNextPage}
              onClick={navigateToNextPage}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              aria-label="Last Page"
              icon={<ArrowRightIcon h={3} w={3} />}
              isDisabled={!canNextPage}
              ml={4}
              onClick={() => navigateToPage(pageCount - 1)}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MarketPage;
