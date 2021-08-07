import { StyledButton } from '~/components/Button';
import { styled } from '~/css';

export const ButtonGroup = styled('div', {
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: '1px',

  [`& ${StyledButton}`]: {
    '&:not(:first-child)': {
      borderBottomLeftRadius: '0',
      borderTopLeftRadius: '0',
    },
    '&:not(:last-child)': {
      borderBottomRightRadius: '0',
      borderTopRightRadius: '0',
    },
  },
});
