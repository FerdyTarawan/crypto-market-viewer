import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MarketPage from 'pages/MarketPage';
import NotFoundPage from 'pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MarketPage />} path="/" />
          <Route element={<NotFoundPage />} path="*" />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
