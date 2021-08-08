import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

import { Button } from '~/components/Button';
import { Icon, IconNames } from '~/components/Icon';

import { icons } from './Icon';

const NONE = '(none)';

const iconOptions = [NONE, ...icons];

const renderIcon = (name: string) =>
  name === NONE ? undefined : <Icon name={name as IconNames} />;

export default {
  Basic() {
    const [label] = useValue('label', { defaultValue: 'Button' });
    const [appearance] = useSelect('appearance', {
      options: ['normal', 'clear'],
    });
    const [intent] = useSelect('intent', {
      options: ['neutral', 'action', 'danger'],
    });
    const [size] = useSelect('size', {
      options: ['small', 'normal', 'large'],
      defaultValue: 'normal',
    });
    const [iconBefore] = useSelect('iconBefore', {
      options: iconOptions,
    });
    const [iconAfter] = useSelect('iconAfter', {
      options: iconOptions,
    });
    const [iconOnly] = useSelect('iconOnly', {
      options: ['no', 'yes'],
    });
    const [disabled] = useSelect('disabled', {
      options: ['no', 'yes'],
    });

    return (
      <Button
        disabled={disabled === 'yes'}
        label={label}
        appearance={appearance}
        intent={intent}
        size={size}
        iconBefore={renderIcon(iconBefore)}
        iconAfter={renderIcon(iconAfter)}
        iconOnly={iconOnly === 'yes'}
      />
    );
  },
};
