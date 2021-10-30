import { CircularProgress, Flex } from '@chakra-ui/react';
import React from 'react';

const LoadingFullscreen: React.FC = () => {
  return (
    <Flex
      alignItems="center"
      height="100vh"
      justifyContent="center"
      width="100vw"
    >
      <CircularProgress isIndeterminate />
    </Flex>
  );
};

export default LoadingFullscreen;
