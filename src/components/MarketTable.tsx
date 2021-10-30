/* eslint-disable react/jsx-key */
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Column, usePagination, useTable } from 'react-table';

import { TickerWithAsset } from 'types/ticker';

export interface MarketTableProps {
  columns: Column<TickerWithAsset>[];
  data: TickerWithAsset[];
  indexState: number;
  setIndexState: React.Dispatch<React.SetStateAction<number>>;
  pageSize?: number;
}

const MarketTable: React.FC<MarketTableProps> = ({
  columns,
  data,
  indexState,
  pageSize,
  setIndexState,
}) => {
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
      data: data,
      initialState: { pageIndex: indexState, pageSize },
    },
    usePagination,
  );

  const navigateToPage = useCallback(
    (index: number) => {
      setIndexState(index);
      gotoPage(index);
    },
    [gotoPage, setIndexState],
  );

  const navigateToNextPage = useCallback(() => {
    setIndexState((prevState) => prevState + 1);
    nextPage();
  }, [nextPage, setIndexState]);

  const navigateToPreviousPage = useCallback(() => {
    setIndexState((prevState) => prevState - 1);
    previousPage();
  }, [previousPage, setIndexState]);

  return (
    <>
      <Table {...getTableProps()}>
        <Thead flexDir="column">
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
    </>
  );
};

MarketTable.defaultProps = {
  pageSize: 50,
};

export default MarketTable;
