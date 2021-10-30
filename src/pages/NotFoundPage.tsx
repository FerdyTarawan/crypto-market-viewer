import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

import { t } from 'utils/translation';

export interface NotFoundPageProps {
  errorText?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  errorText = t('error.routeNotFound'),
}) => {
  return (
    <Flex
      alignItems="center"
      backgroundColor="facebook.900"
      justifyContent="center"
      minHeight="100vh"
    >
      <Heading as="h1" color="white" textAlign="center">
        {errorText}
      </Heading>
    </Flex>
  );
};

NotFoundPage.defaultProps = {
  errorText: t('error.routeNotFound'),
};

export default NotFoundPage;
