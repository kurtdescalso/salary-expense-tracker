import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../../constants';

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: FONT_SIZE * 0.5,
    paddingHorizontal: FONT_SIZE,
    marginBottom: FONT_SIZE * 0.25,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionLabel: {
    maxWidth: '60%',
  },
  amountLabel: {
    maxWidth: '40%',
  },
});

export default styles;
