import * as React from 'react';
import {
  Dimensions,
  StatusBar,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {FAB, IconButton, Text, ProgressBar} from 'react-native-paper';
import {useHeaderHeight} from '@react-navigation/elements';
import {AppStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getDBConnection} from '../services/database';
import {getSalaryRecords, getTotalSalaries} from '../services/salary';
import {getTotalExpenses} from '../services/expense';
import useSalaryRecordStore from '../stores/SalaryStore';
import DashboardStyles from '../styles/DashboardStyles';
import CommonStyles from '../styles/CommonStyles';
import SalaryItem from '../components/SalaryItem';
import NoResultsView from '../components/NoResultsView';
import BalanceView from '../components/BalanceView';
import {FONT_SIZE} from '../constants';

const styles = DashboardStyles;

type DashboardPageStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const DashboardPage = ({
  navigation,
}: DashboardPageStackScreenProps<'Dashboard'>) => {
  const headerHeight = useHeaderHeight();

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
        <View>
          <Text style={CommonStyles.headerText}>Salary Records</Text>
        </View>
        {isLoading ? <ProgressBar indeterminate /> : null}
        <FlatList
          data={salaryList}
          renderItem={({item}) => {
            return <SalaryItem navigation={navigation} {...item} />;
          }}
          keyExtractor={(item, index) =>
            `salary-record-item-${item.id}-${index}`
          }
          onScrollBeginDrag={onScrollStart}
          onScrollEndDrag={onScrollEnd}
          ListEmptyComponent={
            <NoResultsView message="No salary records found." />
          }
          style={styles.salaryList}
        />
        {/*salaryList.length > 0 ? <BalanceView balance={balance} /> : null}
        {!isScrolling ? (
          <FAB
            icon="cash-plus"
            style={styles.addSalaryButton}
            onPress={goToAddSalaryRecord}
          />
        ) : null*/}
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
              onPress={goToAddSalaryRecord}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardPage;
