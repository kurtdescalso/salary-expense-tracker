import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
  },
  noResultsContainer: {
    paddingVertical: FONT_SIZE / 2,
  },
  noResultsText: {
    textAlign: 'center',
  },
  salaryItemContainer: {
    paddingVertical: FONT_SIZE,
    // marginHorizontal: FONT_SIZE,
    // marginBottom: FONT_SIZE / 8,
  },
  expensesList: {
    maxHeight: heightPercentageToDP(62.5),
    // marginHorizontal: FONT_SIZE,
    // marginVertical: FONT_SIZE / 8,
  },
  expenseItem: {
    paddingHorizontal: FONT_SIZE,
    paddingVertical: FONT_SIZE,
    // marginHorizontal: FONT_SIZE / 4,
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
  balanceFooterAmountPositive: {
    color: 'green',
    fontWeight: 'bold',
  },
  balanceFooterAmountNegative: {
    color: 'red',
    fontWeight: 'bold',
  },
  addExpenseButton: {
    position: 'absolute',
    bottom: FONT_SIZE * 10,
    right: FONT_SIZE * 2,
  },
});

export default styles;
