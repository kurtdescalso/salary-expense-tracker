import * as React from 'react';
import {
  Dimensions,
  StatusBar,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {FAB, ProgressBar, IconButton} from 'react-native-paper';
import {useHeaderHeight} from '@react-navigation/elements';
import {getDBConnection} from '../services/database';
import {getSalaryRecordById} from '../services/salary';
import {getExpensesBySalaryRecordId} from '../services/expense';
import useSalaryRecordStore from '../stores/SalaryStore';
import ExpensesViewStyles from '../styles/ExpensesViewStyles';
import SalaryItem from '../components/SalaryItem';
import ExpenseItem from '../components/ExpenseItem';
import BalanceView from '../components/BalanceView';
import NoResultsView from '../components/NoResultsView';
import {AppStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FONT_SIZE} from '../constants';

const styles = ExpensesViewStyles;

type ExpensesViewPageStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const ExpensesViewPage = ({
  navigation,
  route,
}: ExpensesViewPageStackScreenProps<'Expenses'>) => {
  const headerHeight = useHeaderHeight();

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
    <SafeAreaView
      style={[
        styles.mainContainer,
        {
          height:
            Dimensions.get('window').height -
            headerHeight -
            (StatusBar.currentHeight || 0),
        },
      ]}>
      <View style={styles.mainflexContainer}>
        {isLoading ? (
          <ProgressBar indeterminate />
        ) : (
          <View style={styles.salaryItemContainer}>
            {salaryRecord ? <SalaryItem {...salaryRecord} /> : null}
          </View>
        )}
        <FlatList
          data={expenseList}
          renderItem={({item}) => (
            <ExpenseItem {...item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => `expense-item-${item.id}-${index}`}
          onScrollBeginDrag={onScrollStart}
          onScrollEndDrag={onScrollEnd}
          ListEmptyComponent={
            <NoResultsView message="No expenses found for salary record." />
          }
          style={styles.expensesList}
        />
        <View style={styles.controlsFooter}>
          <View style={styles.controlsFooterInnerFlex}>
            <View style={styles.balanceViewContainer}>
              <BalanceView balance={balance} />
            </View>
            <IconButton
              icon="cash-plus"
              color="#01645a"
              size={FONT_SIZE * 1.5}
              style={styles.addSalaryIconButton}
              onPress={goToAddExpenseRecord}
            />
          </View>
        </View>
        {/*!isScrolling ? (
          <FAB
            icon="cash-plus"
            style={styles.addExpenseButton}
            onPress={goToAddExpenseRecord}
          />
        ) : null*/}
      </View>
    </SafeAreaView>
  );
};

export default ExpensesViewPage;
