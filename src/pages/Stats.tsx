import * as React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  View,
  FlatList,
} from 'react-native';
import {Searchbar, useTheme} from 'react-native-paper';
import BottomTabs from '../components/BottomTabs';
import NoResultsView from '../components/NoResultsView';
import DynamicExpenseItem from '../components/DynamicExpenseItem';
import TotalExpensesView from '../components/TotalExpensesView';
import {useHeaderHeight} from '@react-navigation/elements';
import {AppStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import StatsStyles from '../styles/StatsStyles';
import {getAllExpenses} from '../services/expense';
import {getDBConnection} from '../services/database';
import {IExpenseEntry} from '../schemas/salaries';
import useSalaryRecordStore from '../stores/SalaryStore';

type StatsPageStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const styles = StatsStyles;

const StatsPage = ({navigation}: StatsPageStackScreenProps<'Stats'>) => {
  const headerHeight = useHeaderHeight();
  const theme = useTheme();

  const allExpenses = useSalaryRecordStore(state => state.allExpenseRecords);
  const setAllExpenses = useSalaryRecordStore(
    state => state.setAllExpenseRecords,
  );

  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredExpensesList = React.useMemo<IExpenseEntry[]>(() => {
    return allExpenses.filter(expense => {
      return expense.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [allExpenses, searchQuery]);

  const totalExpense = React.useMemo<number>(() => {
    let totalExpense = 0;
    filteredExpensesList.forEach(expense => {
      totalExpense += expense.amount;
    });
    return totalExpense;
  }, [filteredExpensesList]);

  React.useEffect(() => {
    (async () => {
      const db = await getDBConnection();
      const result = await getAllExpenses(db);
      const rawExpenseList = result[0].rows.raw();
      const mappedExpenseList: IExpenseEntry[] = rawExpenseList.map(
        (expense: IExpenseEntry) => {
          return {
            id: expense.id,
            amount: expense.amount,
            description: expense.description,
            category: expense.category,
            accounting_date: expense.accounting_date,
            created_at: expense.created_at,
            salary_id: expense.salary_id,
          };
        },
      );
      setAllExpenses(mappedExpenseList);
    })();
  }, []);

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
        <View
          style={[
            styles.searchBarContainer,
            {backgroundColor: theme.colors.primary},
          ]}>
          <Searchbar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name of expense"
          />
        </View>
        <FlatList
          data={filteredExpensesList}
          keyExtractor={(item, index) =>
            `stats-expense-list-${item.id}-${index}`
          }
          renderItem={({item}) => {
            return <DynamicExpenseItem expense={item} />;
          }}
          ListEmptyComponent={<NoResultsView message="No expenses found." />}
        />
        <TotalExpensesView total={totalExpense} />
      </View>
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
};

export default StatsPage;
