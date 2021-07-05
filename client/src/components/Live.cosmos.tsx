import React, { FC } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import vsDark from 'prism-react-renderer/themes/vsDark';

import { Box } from '~/components/Box';
import { Flex } from '~/components/Flex';

export interface LiveProps {
  liveCode: string;
  liveScope: Record<string, unknown>;
}

export const Live: FC<LiveProps> = ({ liveCode, liveScope }) => (
  <LiveProvider code={liveCode.trim()} scope={liveScope} theme={vsDark}>
    <Flex direction="column" gap="2" css={{ margin: '-$2', height: '100vh' }}>
      <Box css={{ flexGrow: 1, padding: '$2' }}>
        <LivePreview />
      </Box>
      <Box css={{ overflowY: 'auto', minHeight: '140px' }}>
        <LiveError />
        <LiveEditor />
      </Box>
    </Flex>
  </LiveProvider>
);
