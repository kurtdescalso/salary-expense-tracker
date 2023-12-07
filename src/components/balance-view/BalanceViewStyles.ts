import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../../constants';

const styles = StyleSheet.create({
  balanceFooter: {
    paddingHorizontal: FONT_SIZE,
    paddingVertical: FONT_SIZE / 2,
    marginVertical: FONT_SIZE / 2,
  },
  innerFlexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceFooterAmountPositive: {
    color: 'green',
    fontWeight: 'bold',
  },
  balanceFooterAmountNegative: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default styles;
