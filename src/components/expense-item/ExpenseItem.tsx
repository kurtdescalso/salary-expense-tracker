import * as React from 'react';
import {Pressable, View} from 'react-native';
import {Surface, Text, useTheme} from 'react-native-paper';
import {IExpenseEntry} from '../../schemas/salaries';
import {formatToPhp} from '../../utils/currency';
import {parseIsoString, formatToStandardDate} from '../../utils/datetime';
import styles from './ExpenseItemStyles';

interface IExpenseEntryItemProps {
  navigation?: any;
}

const ExpenseItem = (props: IExpenseEntryItemProps & IExpenseEntry) => {
  const theme = useTheme();

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

  return (
    <Pressable
      style={[styles.expenseItem, {backgroundColor: theme.colors.surface}]}
      onLongPress={() => {
        if (props.navigation) {
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
        }
      }}>
      <Surface
        style={[
          styles.expenseItemInnerContainer,
          {backgroundColor: theme.colors.surface},
        ]}>
        <View style={styles.expenseDetails}>
          <Text style={styles.expenseDescription}>{props.description}</Text>
          <Text style={styles.itemFontStyle}>{props.category}</Text>
          <Text style={styles.itemFontStyle}>{dateDisplayString}</Text>
        </View>
        <View style={styles.expenseAmount}>
          <Text style={styles.itemFontStyle}>{currencyDisplayString}</Text>
        </View>
      </Surface>
    </Pressable>
  );
};

export default ExpenseItem;
