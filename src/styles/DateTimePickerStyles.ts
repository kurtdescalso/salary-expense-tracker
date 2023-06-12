import {StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {FONT_SIZE} from '../constants';

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: FONT_SIZE / 2,
    maxHeight: heightPercentageToDP(50),
    alignItems: 'center',
  },
  controlLabels: {
    width: '92.5%',
    textAlign: 'left',
  },
  controlButton: {
    width: '92.5%',
  },
});

export default styles;
