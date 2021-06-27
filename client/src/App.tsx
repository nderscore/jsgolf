import React, { FC } from 'react';

import { Router } from '~/router';
import { globalStyles } from '~/css/globalStyles';
import { providers } from '~/contexts';

export const App: FC = () => {
  globalStyles();

  return providers.reduce(
    (prev, NextComponent) => <NextComponent>{prev}</NextComponent>,
    <Router />,
  );
};
