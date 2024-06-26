import * as React from 'react';
import {
  Dimensions,
  StatusBar,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {IconButton, ProgressBar, useTheme} from 'react-native-paper';
import {useHeaderHeight} from '@react-navigation/elements';
import {BOTTOM_TABBAR_HEIGHT} from '../../constants';
import {SalaryExpenseManagementStackParamList} from '../../stacks/SalaryExpenseManagementStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SalaryItem from '../../components/salary-item/SalaryItem';
import PinnedSalariesList from '../../components/pinned-salaries-list/PinnedSalariesList';
import NoResultsView from '../../components/no-results-view/NoResultsView';
import BalanceView from '../../components/balance-view/BalanceView';
import {useNavigation} from '@react-navigation/native';
import {getDBConnection} from '../../services/database';
import {getPinnedSalaryRecords, getSalaryRecords} from '../../services/salary';
import {getAllExpenses} from '../../services/expense';
import {ISalaryRecord} from '../../schemas/salaries';
import useSalaryRecordStore from '../../stores/SalaryStore';
import styles from './SalaryListStyles';

type SalaryListPageNavigationProps = NativeStackNavigationProp<
  SalaryExpenseManagementStackParamList,
  'Salary List'
>;

const SalaryListPage = () => {
  const theme = useTheme();

  const headerHeight = useHeaderHeight();

  const navigation = useNavigation<SalaryListPageNavigationProps>();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isPinnedSalariesLoading, setIsPinnedSalariesLoading] =
    React.useState<boolean>(false);
  const [balance, setBalance] = React.useState<number>(0);

  const salaryList = useSalaryRecordStore(state => state.salaryRecords);
  const setSalaryList = useSalaryRecordStore(state => state.setSalaryRecords);

  const pinnedSalaryRecords = useSalaryRecordStore(
    state => state.pinnedSalaryRecords,
  );
  const setPinnedSalaryRecords = useSalaryRecordStore(
    state => state.setPinnedSalaryRecords,
  );

  const allExpensesList = useSalaryRecordStore(
    state => state.allExpenseRecords,
  );
  const setAllExpensesList = useSalaryRecordStore(
    state => state.setAllExpenseRecords,
  );

  const goToAddSalaryRecord = () => {
    navigation.navigate('Add Salary');
  };

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const db = await getDBConnection();
        const result = await getSalaryRecords(db);
        setSalaryList(result[0].rows.raw());
      } catch (error) {
        console.error('get salary records rejected');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
      setIsLoading(false);
    })();
  }, [setSalaryList]);

  React.useEffect(() => {
    (async () => {
      try {
        setIsPinnedSalariesLoading(true);
        const db = await getDBConnection();
        const result = await getPinnedSalaryRecords(db);
        console.log(result[0].rows.raw());
        setPinnedSalaryRecords(result[0].rows.raw());
      } catch (error) {
        console.error('get pinned salary records rejected');
        console.error(error);
      } finally {
        setIsPinnedSalariesLoading(false);
      }
      setIsPinnedSalariesLoading(false);
    })();
  }, [setPinnedSalaryRecords]);

  React.useEffect(() => {
    (async () => {
      const db = await getDBConnection();
      const allExpensesRaw = await getAllExpenses(db);
      setAllExpensesList(allExpensesRaw[0].rows.raw());
    })();
  }, [setAllExpensesList]);

  React.useEffect(() => {
    (async () => {
      try {
        let totalSalaries = 0;
        salaryList.forEach(salary => {
          totalSalaries += salary.amount;
        });

        let totalExpenses = 0;
        allExpensesList.forEach(expense => {
          totalExpenses += expense.amount;
        });

        const newBalance = totalSalaries - totalExpenses;
        setBalance(newBalance);
      } catch (err) {
        console.log('get balance queries rejected');
        console.log(err);
      }
    })();
  }, [salaryList, allExpensesList]);

  const renderItem = React.useCallback(
    ({item}: {item: ISalaryRecord}) => {
      return <SalaryItem {...item} navigation={navigation} />;
    },
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
        {isLoading ? <ProgressBar indeterminate /> : null}
        <FlatList
          data={salaryList}
          ListHeaderComponent={<PinnedSalariesList navigation={navigation} />}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            `salary-record-item-${item.id}-${index}`
          }
          ListEmptyComponent={
            <NoResultsView message="No salary records found." />
          }
          style={styles.salaryList}
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
              onPress={goToAddSalaryRecord}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SalaryListPage;
