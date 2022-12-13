import * as React from 'react';
import {FlatList, View} from 'react-native';
import {Card, FAB, ProgressBar, Text} from 'react-native-paper';
import {
  getDBConnection,
  getSalaryRecordById,
  getExpensesBySalaryRecordId,
} from '../services/database';
import useSalaryRecordStore from '../stores/SalaryStore';
import ExpensesViewStyles from '../styles/ExpensesViewStyles';
import SalaryItem from '../components/SalaryItem';
import ExpenseItem from '../components/ExpenseItem';

const styles = ExpensesViewStyles;

const ExpensesViewPage = ({navigation, route}) => {
  const {salaryId} = route.params;

  const [isLoading, setIsLoading] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [balance, setBalance] = React.useState(0);

  const storeSalaryRecords = useSalaryRecordStore(state => state.salaryRecords);
  const salaryRecord = useSalaryRecordStore(
    state => state.selectedSalaryRecord,
  );
  const setSalaryRecord = useSalaryRecordStore(
    state => state.setSelectedSalaryRecord,
  );
  const expenseList = useSalaryRecordStore(state => state.expenseRecords);
  const setExpenseList = useSalaryRecordStore(state => state.setExpenseRecords);

  const goToAddExpenseRecord = React.useCallback(() => {
    navigation.navigate('Add Expense', {salaryId: salaryId});
  }, [navigation, salaryId]);

  const onScrollStart = () => {
    setIsScrolling(true);
  };

  const onScrollEnd = () => {
    setIsScrolling(false);
  };

  React.useEffect(() => {
    if (salaryId) {
      (async () => {
        setIsLoading(true);
        const db = await getDBConnection();
        const targetSalaryRecord = await getSalaryRecordById(db, salaryId);
        setSalaryRecord(targetSalaryRecord[0].rows.raw()[0]);
        const result = await getExpensesBySalaryRecordId(db, salaryId);
        const targetExpenses = result[0].rows.raw();
        setExpenseList(result[0].rows.raw());
        const totalExpenses = targetExpenses
          .map(expense => expense.amount)
          .reduce<number>((prevExpense, nextExpense) => {
            return prevExpense + nextExpense;
          }, 0);
        setBalance(salaryRecord.amount - totalExpenses);
        setIsLoading(false);
      })();
    }
  }, [
    storeSalaryRecords,
    salaryId,
    salaryRecord.amount,
    setExpenseList,
    setSalaryRecord,
  ]);

  return (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <ProgressBar indeterminate />
      ) : (
        <View style={styles.salaryItemContainer}>
          <SalaryItem {...salaryRecord} />
        </View>
      )}
      {(expenseList && expenseList.length < 1) || !expenseList ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            No expenses found for salary record.
          </Text>
        </View>
      ) : null}
      <FlatList
        data={expenseList}
        renderItem={({item}) => {
          /*
            <Card style={styles.expenseItem}>
              <View style={styles.expenseItemInnerContainer}>
                <View style={styles.expenseDetails}>
                  <Text>{item.description}</Text>
                  <Text>{item.accounting_date}</Text>
                </View>
                <View style={styles.expenseAmount}>
                  <Text>{item.amount}</Text>
                </View>
              </View>
            </Card>
          */
          return <ExpenseItem {...item} navigation={navigation} />;
        }}
        keyExtractor={(item, index) => `expense-item-${item.id}-${index}`}
        onScrollBeginDrag={onScrollStart}
        onScrollEndDrag={onScrollEnd}
        style={styles.expensesList}
      />
      <View style={styles.balanceFooter}>
        <Text>Balance:</Text>
        <Text
          style={
            balance > 0
              ? styles.balanceFooterAmountPositive
              : styles.balanceFooterAmountNegative
          }>
          {balance.toFixed(2)}
        </Text>
      </View>
      {!isScrolling ? (
        <FAB
          icon="cash-plus"
          style={styles.addExpenseButton}
          onPress={goToAddExpenseRecord}
        />
      ) : null}
    </View>
  );
};

export default ExpensesViewPage;
