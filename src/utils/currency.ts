import Intl from 'intl';

export const formatToPhp = (amount: number) => {
  return Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
};
