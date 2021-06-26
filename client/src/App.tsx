import React, { FC } from 'react';

import { Router } from '~/router';

import { globalStyles } from '~/css/globalStyles';

export const App: FC = () => {
  globalStyles();

  return <Router />;
};
