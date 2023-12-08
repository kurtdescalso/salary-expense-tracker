import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../../constants';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
  },
  mainflexContainer: {
    flex: 1,
  },
  noResultsContainer: {
    paddingVertical: FONT_SIZE / 2,
  },
  noResultsText: {
    textAlign: 'center',
  },
  salaryItemContainer: {
    paddingVertical: FONT_SIZE,
  },
  expensesList: {
    flex: 1,
  },
  controlsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: FONT_SIZE,
  },
  controlsFooterInnerFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceViewContainer: {
    flex: 1,
  },
  addExpenseButton: {
    position: 'absolute',
    bottom: FONT_SIZE * 10,
    right: FONT_SIZE * 2,
  },
});

export default styles;
