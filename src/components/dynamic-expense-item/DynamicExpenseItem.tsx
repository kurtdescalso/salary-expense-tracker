import * as React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {IExpenseEntry} from '../../schemas/salaries';
import {formatToPhp} from '../../utils/currency';
import {formatToStandardDate} from '../../utils/datetime';
import {parse} from 'date-fns';
import {FONT_SIZE} from '../../constants';
import DynamicExpenseItemStyles from './DynamicExpenseItemStyles';

const styles = DynamicExpenseItemStyles;

interface IDynamicExpenseItemProps {
  expense: IExpenseEntry;
  isCompactView: boolean;
}

const COMPACT_DETAILS_VIEW_HEIGHT = 0;
const EXPANDED_DETAILS_VIEW_HEIGHT = FONT_SIZE * 3;

const DynamicExpenseItem = (props: IDynamicExpenseItemProps) => {
  const parsedDate = React.useMemo(() => {
    return parse(
      props.expense.accounting_date,
      'uuuu-MM-dd HH:mm:ss',
      new Date(),
    );
  }, [props.expense.accounting_date]);

  const animationHeight = useSharedValue(0);

  React.useEffect(() => {
    if (props.isCompactView) {
      animationHeight.value = withTiming(COMPACT_DETAILS_VIEW_HEIGHT);
    } else {
      animationHeight.value = withSpring(EXPANDED_DETAILS_VIEW_HEIGHT);
    }
  }, [props.isCompactView]);

  return (
    <Card style={styles.mainContainer}>
      <View style={styles.detailsContainer}>
        <Text>{props.expense.description}</Text>
        <Text>{formatToPhp(props.expense.amount)}</Text>
      </View>
      <Animated.View style={{height: animationHeight}}>
        <Text>{props.expense.category}</Text>
        <Text>{formatToStandardDate(parsedDate)}</Text>
      </Animated.View>
    </Card>
  );
};

export default DynamicExpenseItem;
