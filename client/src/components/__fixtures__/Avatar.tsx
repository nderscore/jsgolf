import React from 'react';
import { useSelect } from 'react-cosmos/fixture';

import { Avatar } from '~/components/Avatar';

export default {
  Basic() {
    const [size] = useSelect('size', {
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      defaultValue: '5',
    });

    return (
      <Avatar size={size} user={{ name: 'nderscore', githubId: 2250252 }} />
    );
  },
};
