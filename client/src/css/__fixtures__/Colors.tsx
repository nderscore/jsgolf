import React from 'react';

import { theme } from '~/css';
import { Flex } from '~/components/Flex';
import { Box } from '~/components/Box';
import { Text } from '~/components/Text';

export default {
  Light() {
    return (
      <Flex gap="2" direction="column">
        {Object.entries(theme.colors).map(([name, { value, variable }]) => {
          return (
            <Flex gap="2" css={{ alignItems: 'center' }} key={name}>
              <Box
                css={{
                  backgroundColor: `$${name}`,
                  borderRadius: '$2',
                  width: '$5',
                  height: '$5',
                }}
              />
              <Text css={{ fontWeight: 'bold' }}>${name}</Text>
              <Text>{`${variable}: ${value}`}</Text>
            </Flex>
          );
        })}
      </Flex>
    );
  },
};
