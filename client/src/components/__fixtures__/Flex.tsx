import React, { useMemo } from 'react';
import { useValue, useSelect } from 'react-cosmos/fixture';

import { Box } from '~/components/Box';
import { Flex } from '~/components/Flex';

const makeChildren = (length: number) =>
  Array.from({ length }, (_, index) => (
    <Box
      key={index}
      css={{ padding: '$1', border: '1px solid $colors$manatee200' }}
    >
      Child
    </Box>
  ));

export default {
  Basic() {
    const [direction] = useSelect('direction', {
      options: ['row', 'column'],
    });
    const [gap] = useSelect('gap', {
      options: ['0', '1', '2', '3', '4'],
    });
    const [length] = useValue('# children', { defaultValue: 3 });
    const children = useMemo(() => makeChildren(length), [length]);

    return (
      <Flex direction={direction} gap={gap}>
        {children}
      </Flex>
    );
  },

  ResponsiveDirection() {
    const [length] = useValue('# children', { defaultValue: 3 });
    const [gap] = useSelect('gap', {
      options: ['0', '1', '2', '3', '4'],
    });
    const children = useMemo(() => makeChildren(length), [length]);

    return (
      <Flex direction={{ '@initial': 'column', '@sm': 'row' }} gap={gap}>
        {children}
      </Flex>
    );
  },
};
