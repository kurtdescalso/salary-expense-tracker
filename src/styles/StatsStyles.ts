import {StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {FONT_SIZE} from '../constants';

const styles = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
  },
  mainflexContainer: {
    flex: 1,
  },
  searchBarContainer: {
    paddingHorizontal: FONT_SIZE * 0.5,
    paddingBottom: FONT_SIZE * 0.5,
  },
});

export default styles;
