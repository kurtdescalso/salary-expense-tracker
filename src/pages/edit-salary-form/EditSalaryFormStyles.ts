import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../../constants';

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: FONT_SIZE,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: FONT_SIZE * 1.25,
    paddingVertical: FONT_SIZE / 2,
  },
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
