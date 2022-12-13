import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../constants';

const styles = StyleSheet.create({
  expenseItem: {
    paddingHorizontal: FONT_SIZE,
    paddingVertical: FONT_SIZE,
    marginHorizontal: FONT_SIZE / 4,
    marginVertical: FONT_SIZE / 4,
  },
  expenseItemInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  expenseDetails: {
    flex: 2,
  },
  expenseAmount: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default styles;
