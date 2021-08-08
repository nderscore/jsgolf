import { StyledButton } from '~/components/Button';
import { styled } from '~/css';

export const ButtonGroup = styled('div', {
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: '1px',

  [`& ${StyledButton}`]: {
    '&:not(:first-child)': {
      borderStartStartRadius: '0',
      borderEndStartRadius: '0',
    },
    '&:not(:last-child)': {
      borderEndEndRadius: '0',
      borderStartEndRadius: '0',
    },
  },
});
