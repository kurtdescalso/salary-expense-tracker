import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../constants';

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: FONT_SIZE * 1.25,
    paddingVertical: FONT_SIZE,
    paddingLeft: FONT_SIZE * 1.25,
  },
  formPadding: {
    paddingTop: FONT_SIZE,
  },
});

export default styles;
