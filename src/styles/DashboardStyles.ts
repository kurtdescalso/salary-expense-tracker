import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FONT_SIZE} from '../constants';

const styles = StyleSheet.create({
  mainContainer: {
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: FONT_SIZE * 1.25,
    paddingTop: FONT_SIZE,
    paddingLeft: FONT_SIZE * 2,
  },
  noResultsContainer: {
    paddingVertical: FONT_SIZE,
  },
  noResultsText: {
    textAlign: 'center',
  },
  salaryList: {
    maxHeight: heightPercentageToDP(80),
    marginHorizontal: FONT_SIZE,
  },
  balanceFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: FONT_SIZE * 2,
    paddingVertical: FONT_SIZE,
  },
  balanceFooterLabel: {
    fontWeight: 'bold',
  },
  balanceFooterAmountPositive: {
    color: 'green',
    fontWeight: 'bold',
  },
  balanceFooterAmountNegative: {
    color: 'red',
    fontWeight: 'bold',
  },
  addSalaryButton: {
    position: 'absolute',
    bottom: FONT_SIZE * 10,
    right: FONT_SIZE * 2,
  },
});

export default styles;
