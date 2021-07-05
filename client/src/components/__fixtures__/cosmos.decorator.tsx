import React, { FC } from 'react';

import { Box } from '~/components/Box';

const decorator: FC = ({ children }) => {
  return <Box css={{ padding: '$2', height: '100%' }}>{children}</Box>;
};

export default decorator;
