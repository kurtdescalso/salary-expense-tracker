import * as React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {IExpenseEntry} from '../schemas/salaries';
import ExpenseItemStyles from '../styles/ExpenseItemStyles';

interface IExpenseEntryItemProps {
  navigation?: any;
}

const styles = ExpenseItemStyles;

const SalaryItem = (props: IExpenseEntryItemProps & IExpenseEntry) => {
  return (
    <Card
      style={styles.expenseItem}
      onLongPress={() => {
        if (props.navigation) {
          const targetExpense: IExpenseEntry = {
            id: props.id,
            description: props.description,
            amount: props.amount,
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
          <Text>{props.description}</Text>
          <Text>{props.accounting_date}</Text>
        </View>
        <View style={styles.expenseAmount}>
          <Text>{props.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Card>
  );
};

export default SalaryItem;
