import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  balanceFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: FONT_SIZE * 2,
    paddingVertical: FONT_SIZE,
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
