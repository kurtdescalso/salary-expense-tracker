import * as React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {IExpenseEntry} from '../../schemas/salaries';
import ExpenseItemStyles from './ExpenseItemStyles';
import {formatToPhp} from '../../utils/currency';
import {parseIsoString, formatToStandardDate} from '../../utils/datetime';

interface IExpenseEntryItemProps {
  navigation?: any;
}

const styles = ExpenseItemStyles;

const SalaryItem = (props: IExpenseEntryItemProps & IExpenseEntry) => {
  const dateDisplayString = React.useMemo(() => {
    const newDateObject = parseIsoString(props.accounting_date);
    return formatToStandardDate(newDateObject);
  }, [props.accounting_date]);

  const currencyDisplayString = React.useMemo(() => {
    return formatToPhp(props.amount);
  }, [props.amount]);

  return (
    <Card
      style={styles.expenseItem}
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
      <View style={styles.expenseItemInnerContainer}>
        <View style={styles.expenseDetails}>
          <Text style={styles.expenseDescription}>{props.description}</Text>
          <Text style={styles.itemFontStyle}>{props.category}</Text>
          <Text style={styles.itemFontStyle}>{dateDisplayString}</Text>
        </View>
        <View style={styles.expenseAmount}>
          <Text style={styles.itemFontStyle}>{currencyDisplayString}</Text>
        </View>
      </View>
    </Card>
  );
};

export default SalaryItem;
