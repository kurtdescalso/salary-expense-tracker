import {StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {FONT_SIZE} from '../constants';

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: FONT_SIZE / 2,
    maxHeight: heightPercentageToDP(50),
  },
  inputContainer: {
    paddingHorizontal: FONT_SIZE,
    paddingVertical: FONT_SIZE / 2,
  },
  dateTimeLabel: {
    fontWeight: 'bold',
  },
  dateTimeValue: {
    textAlign: 'center',
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: heightPercentageToDP(50),
    maxHeight: heightPercentageToDP(50),
  },
});

export default styles;
