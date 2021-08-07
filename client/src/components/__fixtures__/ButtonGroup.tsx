import React from 'react';

import { Live } from '~/components/Live.cosmos';
import { ButtonGroup } from '~/components/ButtonGroup';
import { Button } from '~/components/Button';
import { Icon } from '~/components/Icon';
import { Box } from '~/components/Box';

const liveScope = { Button, ButtonGroup, Icon, Box };

const liveCode = `
<>
  <Box>
    <ButtonGroup>
      <Button
        label="Create"
        intent="action"
        iconBefore={<Icon name="plus-circle" />}
      />
      <Button label="Edit" />
      <Button
        label="Delete"
        intent="danger"
        iconAfter={<Icon name="trash-2" />}
      />
    </ButtonGroup>
  </Box>
  <Box css={{ mt: '$3' }}>
    <ButtonGroup>
      <Button
        label="Create"
        intent="action"
        iconBefore={<Icon name="plus-circle" />}
        size="small"
      />
      <Button label="Edit" size="small" />
      <Button
        label="Delete"
        intent="danger"
        iconAfter={<Icon name="trash-2" />}
        size="small"
      />
    </ButtonGroup>
  </Box>
</>
`;

export default {
  Live() {
    return <Live liveCode={liveCode} liveScope={liveScope} />;
  },
};
