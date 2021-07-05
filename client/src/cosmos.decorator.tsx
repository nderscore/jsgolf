import React, { FC } from 'react';

import { globalStyles } from '~/css/globalStyles';

const decorator: FC = ({ children }) => {
  globalStyles();

  return <>{children}</>;
};

export default decorator;
