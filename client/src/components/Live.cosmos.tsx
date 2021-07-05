import React, { FC } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import vsDark from 'prism-react-renderer/themes/vsDark';

import { Flex } from '~/components/Flex';

export interface LiveProps {
  liveCode: string;
  liveScope: Record<string, unknown>;
}

export const Live: FC<LiveProps> = ({ liveCode, liveScope }) => (
  <LiveProvider code={liveCode.trim()} scope={liveScope} theme={vsDark}>
    <Flex direction="column" gap="2">
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </Flex>
  </LiveProvider>
);
