import React, { FC, ComponentProps, useMemo } from 'react';
import { useValue, useSelect } from 'react-cosmos/fixture';

import { Live } from '~/components/Live.cosmos';
import { Box } from '~/components/Box';
import { Flex } from '~/components/Flex';

const Child: FC<ComponentProps<typeof Box>> = props => {
  const combinedCSS = {
    p: '$1',
    border: '1px solid $colors$manatee200',
    ...props.css,
  } as ComponentProps<typeof Box>['css'];

  return <Box css={combinedCSS}>Child</Box>;
};

const liveCode = `
<Flex
  direction={{ '@initial': 'column', '@sm': 'row' }}
  gap="1"
>
  <Child />
  <Child />
  <Child />
  <Child />
</Flex>
`;

const liveScope = { Flex, Child };

const makeChildren = (length: number) =>
  Array.from({ length }, (_, index) => <Child key={index} />);

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

  Live() {
    return <Live liveCode={liveCode} liveScope={liveScope} />;
  },
};
