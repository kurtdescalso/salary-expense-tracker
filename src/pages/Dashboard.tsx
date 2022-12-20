import * as React from 'react';
import {FlatList, View} from 'react-native';
import {FAB, Text, ProgressBar} from 'react-native-paper';
import {
  getDBConnection,
  getSalaryRecords,
  getTotalSalaries,
  getTotalExpenses,
} from '../services/database';
import useSalaryRecordStore from '../stores/SalaryStore';
import DashboardStyles from '../styles/DashboardStyles';
import CommonStyles from '../styles/CommonStyles';
import SalaryItem from '../components/SalaryItem';
import NoResultsView from '../components/NoResultsView';
import BalanceView from '../components/BalanceView';

const styles = DashboardStyles;

const DashboardPage = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [balance, setBalance] = React.useState<number>(0);
  const salaryList = useSalaryRecordStore(state => state.salaryRecords);
  const setSalaryList = useSalaryRecordStore(state => state.setSalaryRecords);

  const goToAddSalaryRecord = () => {
    navigation.navigate('Add Salary');
  };

  const onScrollStart = () => {
    setIsScrolling(true);
  };

  const onScrollEnd = () => {
    setIsScrolling(false);
  };

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const db = await getDBConnection();
      getSalaryRecords(db)
        .then(result => {
          setSalaryList(result[0].rows.raw());
        })
        .catch(err => {
          console.log('get salary records rejected');
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    })();
  }, [setSalaryList]);

  React.useEffect(() => {
    if (salaryList && salaryList.length > 0) {
      (async () => {
        try {
          const db = await getDBConnection();
          const totalSalaries = (await getTotalSalaries(db))[0].rows.raw();
          const totalExpenses = (await getTotalExpenses(db))[0].rows.raw();
          const newBalance =
            totalSalaries[0].total_salaries - totalExpenses[0].total_expenses;
          setBalance(newBalance);
        } catch (err) {
          console.log('get balance queries rejected');
          console.log(err);
        }
      })();
    }
  }, [salaryList, setSalaryList]);

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={CommonStyles.headerText}>Salary Records</Text>
      </View>
      {isLoading ? <ProgressBar indeterminate /> : null}
      <FlatList
        data={salaryList}
        renderItem={({item}) => {
          return <SalaryItem navigation={navigation} {...item} />;
        }}
        keyExtractor={(item, index) => `salary-record-item-${item.id}-${index}`}
        onScrollBeginDrag={onScrollStart}
        onScrollEndDrag={onScrollEnd}
        ListEmptyComponent={<NoResultsView message="No salary records found." />}
        style={styles.salaryList}
      />
      {salaryList.length > 0 ? (
        <BalanceView balance={balance} />
      ) : null}
      {!isScrolling ? (
        <FAB
          icon="cash-plus"
          style={styles.addSalaryButton}
          onPress={goToAddSalaryRecord}
        />
      ) : null}
    </View>
  );
};

export default DashboardPage;
