import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../../constants';

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: FONT_SIZE,
    paddingVertical: FONT_SIZE / 2,
  },
  menu: {
    width: '92.5%',
  },
  anchorButton: {
    flexDirection: 'row-reverse',
  },
});

export default styles;
