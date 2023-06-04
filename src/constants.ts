import {widthPercentageToDP} from 'react-native-responsive-screen';

export const FONT_SIZE = widthPercentageToDP(3.75);

export const DEVICE_TZ_OFFSET = (new Date().getTimezoneOffset() / 60) * -1;

export interface ISelectOption {
  label: string;
  value: string | number;
}

export const CATEGORY_OPTIONS: ISelectOption[] = [
  {
    label: 'Food',
    value: 'Food',
  },
  {
    label: 'Recurring',
    value: 'Recurring Expenses',
  },
  {
    label: 'Transportation',
    value: 'Transportation',
  },
  {
    label: 'Entertainment',
    value: 'Entertainment',
  },
  {
    label: 'Emergency',
    value: 'Emergency',
  },
];
