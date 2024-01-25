import * as React from 'react';
import {View} from 'react-native';
import {Surface, Text, useTheme} from 'react-native-paper';
import Animated, {
  useAnimatedReaction,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {IExpenseEntry} from '../../schemas/salaries';
import {formatToPhp} from '../../utils/currency';
import {formatToStandardDate} from '../../utils/datetime';
import {parse} from 'date-fns';
import {FONT_SIZE} from '../../constants';
import styles from './DynamicExpenseItemStyles';

interface IDynamicExpenseItemProps {
  expense: IExpenseEntry;
  isCompactView: boolean;
}

const COMPACT_DETAILS_VIEW_HEIGHT = 0;
const EXPANDED_DETAILS_VIEW_HEIGHT = FONT_SIZE * 3;

const DynamicExpenseItem = (props: IDynamicExpenseItemProps) => {
  const theme = useTheme();

  const parsedDate = React.useMemo(() => {
    return parse(
      props.expense.accounting_date,
      'uuuu-MM-dd HH:mm:ss',
      new Date(),
    );
  }, [props.expense.accounting_date]);

  const standardDateDisplayString = React.useMemo(() => {
    try {
      return formatToStandardDate(parsedDate);
    } catch (error) {
      console.log(
        `DynamicExpenseItem: standardDateDisplayString: formatToStandardDate(): ${parsedDate} error: ${error}`,
      );
      return '';
    }
  }, []);

  const animationHeight = useSharedValue(0);

  useAnimatedReaction(
    () => props.isCompactView,
    (isCompactView, previousIsCompactViewValue) => {
      if (previousIsCompactViewValue === isCompactView) return;

      if (isCompactView) {
        animationHeight.value = withTiming(COMPACT_DETAILS_VIEW_HEIGHT);
      } else {
        animationHeight.value = withSpring(EXPANDED_DETAILS_VIEW_HEIGHT);
      }
    },
    [props.isCompactView],
  );

  return (
    <Surface
      style={[styles.mainContainer, {backgroundColor: theme.colors.surface}]}>
      <View style={styles.detailsContainer}>
        <Text numberOfLines={1} style={styles.descriptionLabel}>
          {props.expense.description}
        </Text>
        <Text style={styles.amountLabel}>
          {formatToPhp(props.expense.amount)}
        </Text>
      </View>
      <Animated.View style={{height: animationHeight}}>
        <Text>{props.expense.category}</Text>
        <Text>{standardDateDisplayString}</Text>
      </Animated.View>
    </Surface>
  );
};

export default DynamicExpenseItem;
