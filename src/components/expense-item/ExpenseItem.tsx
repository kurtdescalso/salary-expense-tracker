import * as React from 'react';
import {Pressable, View} from 'react-native';
import {Surface, Text, useTheme} from 'react-native-paper';
import Animated, {
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import {IExpenseEntry} from '../../schemas/salaries';
import {formatToPhp} from '../../utils/currency';
import {parseIsoString, formatToStandardDate} from '../../utils/datetime';
import {SalaryExpenseManagementStackParamList} from '../../stacks/SalaryExpenseManagementStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './ExpenseItemStyles';

type ExpenseItemNavigationProps = NativeStackNavigationProp<
  SalaryExpenseManagementStackParamList,
  'Per Salary Expenses'
>;

interface IExpenseEntryItemProps {
  navigation: ExpenseItemNavigationProps;
}

const ExpenseItem = (props: IExpenseEntryItemProps & IExpenseEntry) => {
  const theme = useTheme();

  const longPressBackgroundColor = useSharedValue(theme.colors.background);

  const animateButton = () => {
    longPressBackgroundColor.value = withSequence(
      withSpring(theme.colors.onSecondary),
      withDelay(200, withSpring(theme.colors.background)),
    );
  };

  const dateDisplayString = React.useMemo(() => {
    try {
      const newDateObject = parseIsoString(props.accounting_date);
      return formatToStandardDate(newDateObject);
    } catch (error) {
      console.log(
        `ExpenseItem: dateDisplayString: formatToStandardDate(): ${props.accounting_date} error: ${error}`,
      );
      return '';
    }
  }, [props.accounting_date]);

  const currencyDisplayString = React.useMemo(() => {
    return formatToPhp(props.amount);
  }, [props.amount]);

  const goToExpenseEditPage = () => {
    const targetExpense: IExpenseEntry = {
      id: props.id,
      description: props.description,
      amount: props.amount,
      category: props.category,
      accounting_date: props.accounting_date,
      created_at: props.created_at,
      salary_id: props.salary_id,
    };
    props.navigation.navigate('Edit Expense', {
      expenseItem: targetExpense,
    });
  };

  return (
    <Pressable
      onPressIn={animateButton}
      onLongPress={goToExpenseEditPage}
      style={[styles.expenseItem, {backgroundColor: theme.colors.surface}]}>
      <Surface style={{backgroundColor: theme.colors.surface}}>
        <Animated.View
          style={[
            styles.expenseItemInnerContainer,
            {backgroundColor: longPressBackgroundColor},
          ]}>
          <View style={styles.expenseDetails}>
            <Text style={styles.expenseDescription}>{props.description}</Text>
            <Text style={styles.itemFontStyle}>{props.category}</Text>
            <Text style={styles.itemFontStyle}>{dateDisplayString}</Text>
          </View>
          <View style={styles.expenseAmount}>
            <Text style={styles.itemFontStyle}>{currencyDisplayString}</Text>
          </View>
        </Animated.View>
      </Surface>
    </Pressable>
  );
};

export default ExpenseItem;
