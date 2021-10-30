import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MarketPage from 'pages/MarketPage';
import NotFoundPage from 'pages/NotFoundPage';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<MarketPage />} path="/" />
            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
