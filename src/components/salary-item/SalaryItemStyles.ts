import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../../constants';

const styles = StyleSheet.create({
  salaryItem: {
    marginBottom: FONT_SIZE / 2,
  },
  salaryItemInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: FONT_SIZE * 1.5,
    paddingVertical: FONT_SIZE,
  },
  detailsContainer: {
    flex: 2,
  },
  amountContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  descriptionText: {
    fontWeight: 'bold',
  },
  itemFontStyle: {
    fontSize: FONT_SIZE,
  },
});

export default styles;
