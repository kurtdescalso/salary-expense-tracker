import {StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {FONT_SIZE} from '../constants';

const styles = StyleSheet.create({
  amountInputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  amountPesos: {
    flexGrow: 4,
  },
  amountCents: {
    flexGrow: 1,
  },
  submitButtonContainer: {
    paddingHorizontal: FONT_SIZE,
    paddingVertical: FONT_SIZE / 2,
  },
});

export default styles;
