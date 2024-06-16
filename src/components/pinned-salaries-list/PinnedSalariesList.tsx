import * as React from 'react';
import {FlatList, View} from 'react-native';
import useSalaryRecordStore from '../../stores/SalaryStore';
import {ISalaryRecord} from '../../schemas/salaries';
import SalaryItem from '../salary-item/SalaryItem';
import {Divider} from 'react-native-paper';
import {SalaryExpenseManagementStackParamList} from '../../stacks/SalaryExpenseManagementStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './PinnedSalariesListStyles';

type SalaryListPageNavigationProps = NativeStackNavigationProp<
  SalaryExpenseManagementStackParamList,
  'Salary List'
>;

interface IPinnedSalariesListProps {
  navigation: SalaryListPageNavigationProps;
}

const PinnedSalariesList = (props: IPinnedSalariesListProps) => {
  const pinnedSalaryRecords = useSalaryRecordStore(
    state => state.pinnedSalaryRecords,
  );

  const renderItem = React.useCallback(
    ({item}: {item: ISalaryRecord}) => {
      return (
        <SalaryItem
          {...item}
          isPinnedAndIsUnderSalaryListComponent={true}
          isReadOnly={false}
          navigation={props.navigation}
        />
      );
    },
    [pinnedSalaryRecords, props.navigation],
  );

  return (
    <View style={styles.pinnedSalariesMainContainer}>
      <FlatList
        data={pinnedSalaryRecords}
        keyExtractor={(item, index) =>
          `pinned-salary-record-${item.id}-${index}`
        }
        ListFooterComponent={<Divider />}
        renderItem={renderItem}
      />
    </View>
  );
};

export default PinnedSalariesList;
