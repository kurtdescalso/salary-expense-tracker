import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../constants';

const styles = StyleSheet.create({
  navButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  navButton: {
    flex: 1,
    paddingVertical: FONT_SIZE * 0.25,
  },
  navButtonLabel: {
    textAlign: 'center',
    paddingVertical: FONT_SIZE * 0.25,
  },
});

export default styles;
