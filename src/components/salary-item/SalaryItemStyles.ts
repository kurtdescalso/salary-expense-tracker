import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../../constants';

const styles = StyleSheet.create({
  salaryItem: {
    marginBottom: FONT_SIZE / 2,
  },
  salaryItemInnerContainer: {
    flexDirection: 'row',
    paddingHorizontal: FONT_SIZE * 1.5,
    paddingVertical: FONT_SIZE,
  },
  detailsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  pinContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: FONT_SIZE / 2,
  },
});

export default styles;
