import React from 'react';
import { useSelect, useValue } from 'react-cosmos/fixture';

import { Input } from '~/components/Input';

export default {
  Basic() {
    const [label] = useValue('label', { defaultValue: 'Label' });
    const [placeholder] = useValue('placeholder', { defaultValue: '' });
    const [size] = useSelect('size', {
      options: ['small', 'normal'],
      defaultValue: 'normal',
    });
    const [type] = useSelect('type', {
      options: ['text', 'password'],
    });
    const [disabled] = useSelect('disabled', {
      options: ['no', 'yes'],
    });

    return (
      <Input
        name="demo-input"
        disabled={disabled === 'yes'}
        label={label}
        placeholder={placeholder || undefined}
        inputSize={size}
        type={type}
      />
    );
  },

  Password() {
    const [label] = useValue('label', { defaultValue: 'Label' });
    const [placeholder] = useValue('placeholder', { defaultValue: '' });
    const [size] = useSelect('size', {
      options: ['small', 'normal'],
      defaultValue: 'normal',
    });
    const [disabled] = useSelect('disabled', {
      options: ['no', 'yes'],
    });

    return (
      <Input
        name="password-input"
        disabled={disabled === 'yes'}
        label={label}
        placeholder={placeholder || undefined}
        inputSize={size}
        type="password"
      />
    );
  },
};
