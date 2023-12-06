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
  headerText: {
    fontWeight: 'bold',
    fontSize: FONT_SIZE * 1.25,
    paddingTop: FONT_SIZE,
    paddingLeft: FONT_SIZE * 2,
  },
  noResultsContainer: {
    paddingVertical: FONT_SIZE,
  },
  noResultsText: {
    textAlign: 'center',
  },
  salaryList: {
    flex: 1,
  },
  controlsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: FONT_SIZE,
  },
  controlsFooterInnerFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceViewContainer: {
    flex: 1,
  },
  addSalaryButton: {
    position: 'absolute',
    bottom: FONT_SIZE * 10,
    right: FONT_SIZE * 2,
  },
  addSalaryIconButton: {
    backgroundColor: '#03dac4',
  },
});

export default styles;
