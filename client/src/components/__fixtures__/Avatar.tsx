import React from 'react';
import { useSelect } from 'react-cosmos/fixture';

import { Avatar } from '~/components/Avatar';

export default {
  Basic() {
    const [size] = useSelect('size', {
      options: ['small', 'normal', 'large'],
      defaultValue: 'normal',
    });

    return (
      <Avatar size={size} user={{ name: 'nderscore', githubId: 2250252 }} />
    );
  },
};
