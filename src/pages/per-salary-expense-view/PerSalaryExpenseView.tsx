import * as React from 'react';
import {
  Dimensions,
  StatusBar,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {ProgressBar, IconButton, useTheme} from 'react-native-paper';
import {useHeaderHeight} from '@react-navigation/elements';
import {getDBConnection} from '../../services/database';
import {getSalaryRecordById} from '../../services/salary';
import {getExpensesBySalaryRecordId} from '../../services/expense';
import {IExpenseEntry} from '../../schemas/salaries';
import useSalaryRecordStore from '../../stores/SalaryStore';
import SalaryItem from '../../components/salary-item/SalaryItem';
import ExpenseItem from '../../components/expense-item/ExpenseItem';
import BalanceView from '../../components/balance-view/BalanceView';
import NoResultsView from '../../components/no-results-view/NoResultsView';
import {SalaryExpenseManagementStackParamList} from '../../stacks/SalaryExpenseManagementStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BOTTOM_TABBAR_HEIGHT, FONT_SIZE} from '../../constants';
import styles from './PerSalaryExpenseViewStyles';

type PerSalaryExpenseViewPageStackScreenProps<
  T extends keyof SalaryExpenseManagementStackParamList,
> = NativeStackScreenProps<SalaryExpenseManagementStackParamList, T>;

const PerSalaryExpenseViewPage = ({
  navigation,
  route,
}: PerSalaryExpenseViewPageStackScreenProps<'Per Salary Expenses'>) => {
  const headerHeight = useHeaderHeight();
  const theme = useTheme();

  const {salaryId} = route.params;

  const [isLoading, setIsLoading] = React.useState(false);
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

  React.useEffect(() => {
    if (salaryId) {
      (async () => {
        setIsLoading(true);

        const db = await getDBConnection();

        const targetSalaryRecord = await getSalaryRecordById(db, salaryId);
        setSalaryRecord(targetSalaryRecord[0].rows.raw()[0]);

        const targetExpensesQueryResult = await getExpensesBySalaryRecordId(
          db,
          salaryId,
        );
        const targetExpenses = targetExpensesQueryResult[0].rows.raw();
        setExpenseList(targetExpenses);

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

  const renderItem = React.useCallback(
    ({item}: {item: IExpenseEntry}) => (
      <ExpenseItem {...item} navigation={navigation} />
    ),
    [navigation],
  );

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {
          height:
            Dimensions.get('window').height -
            headerHeight -
            BOTTOM_TABBAR_HEIGHT -
            (StatusBar.currentHeight || 0),
        },
      ]}>
      <View style={styles.mainflexContainer}>
        {isLoading ? (
          <ProgressBar indeterminate />
        ) : (
          <View style={styles.salaryItemContainer}>
            {salaryRecord ? <SalaryItem {...salaryRecord} isReadOnly /> : null}
          </View>
        )}
        <FlatList
          data={expenseList}
          renderItem={renderItem}
          keyExtractor={(item, index) => `expense-item-${item.id}-${index}`}
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
              iconColor={theme.colors.onPrimary}
              containerColor={theme.colors.primary}
              size={FONT_SIZE * 1.5}
              onPress={goToAddExpenseRecord}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PerSalaryExpenseViewPage;
