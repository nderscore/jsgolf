import React from 'react';

import { Live } from '~/components/Live.cosmos';
import * as Dropdown from '~/components/Dropdown';
import { Box } from '~/components/Box';

const liveScope = { Dropdown, Box };

const liveCode = `
<Box css={{ textAlign: 'center' }}>
  <Dropdown.Root>
    <Dropdown.ImageTrigger>Open</Dropdown.ImageTrigger>
    <Dropdown.Content sideOffset={9}>
      <Dropdown.Item>One</Dropdown.Item>
      <Dropdown.Item>Two</Dropdown.Item>
      <Dropdown.Separator />
      <Dropdown.Item>Three</Dropdown.Item>
      <Dropdown.Root>
        <Dropdown.TriggerItem>Submenu</Dropdown.TriggerItem>
        <Dropdown.Content>
          <Dropdown.Item>Four</Dropdown.Item>
          <Dropdown.Item>Five</Dropdown.Item>
          <Dropdown.Item>Six</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </Dropdown.Content>
  </Dropdown.Root>
</Box>
`;

export default {
  Live() {
    return <Live liveCode={liveCode} liveScope={liveScope} />;
  },
};
