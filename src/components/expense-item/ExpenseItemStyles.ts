import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../../constants';

const EXPENSE_ITEM_DETAIL_FONT_SIZE = FONT_SIZE * 0.8;

const styles = StyleSheet.create({
  expenseItem: {
    marginVertical: FONT_SIZE / 4,
  },
  expenseItemInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: FONT_SIZE,
    paddingVertical: FONT_SIZE,
  },
  expenseDetails: {
    flex: 2,
  },
  expenseDescription: {
    fontSize: EXPENSE_ITEM_DETAIL_FONT_SIZE,
    fontWeight: 'bold',
  },
  itemFontStyle: {
    fontSize: EXPENSE_ITEM_DETAIL_FONT_SIZE,
  },
  expenseAmount: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default styles;
