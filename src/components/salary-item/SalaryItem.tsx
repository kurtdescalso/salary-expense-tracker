import * as React from 'react';
import {Pressable, View} from 'react-native';
import {Surface, Text, IconButton, Icon, useTheme} from 'react-native-paper';
import Animated, {
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import {ISalaryRecord} from '../../schemas/salaries';
import {formatToPhp} from '../../utils/currency';
import {parseIsoString, formatToStandardDateTime} from '../../utils/datetime';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SalaryExpenseManagementStackParamList} from '../../stacks/SalaryExpenseManagementStack';
import {
  addSalaryRecordPin,
  deleteSalaryRecordPin,
  getPinnedSalaryRecords,
} from '../../services/salary';
import {getDBConnection} from '../../services/database';
import useSalaryRecordStore from '../../stores/SalaryStore';
import {FONT_SIZE} from '../../constants';
import styles from './SalaryItemStyles';

type SalaryItemNavigationProps = NativeStackNavigationProp<
  SalaryExpenseManagementStackParamList,
  'Salary List'
>;

interface ISalaryItemProps {
  navigation?: SalaryItemNavigationProps;
  isReadOnly?: boolean;
  isPinnedAndIsUnderSalaryListComponent?: boolean;
}

const SalaryItem = (props: ISalaryItemProps & ISalaryRecord) => {
  const theme = useTheme();

  const [isPinned, setIsPinned] = React.useState(false);

  const pinnedSalaryRecords = useSalaryRecordStore(
    state => state.pinnedSalaryRecords,
  );
  const setPinnedSalaryRecords = useSalaryRecordStore(
    state => state.setPinnedSalaryRecords,
  );

  React.useEffect(() => {
    // properly set the state of the pin button if salary id is in pinned list
    const isCurrentRecordPinned = pinnedSalaryRecords
      .filter(record => Boolean(record.id))
      .map(record => record.id)
      .includes(props.id);
    setIsPinned(isCurrentRecordPinned);
  }, [pinnedSalaryRecords, props.id]);

  const longPressBackgroundColor = useSharedValue(theme.colors.background);

  const dateDisplayString = React.useMemo(() => {
    try {
      if (!props.accounting_date) {
        throw 'missing accounting date: uninitialized (?)';
      }
      const newDateObject = parseIsoString(props.accounting_date);
      return formatToStandardDateTime(newDateObject);
    } catch (error) {
      console.error(`set dateDisplayString error: ${error}`);
      return '';
    }
  }, [props.accounting_date]);

  const currencyDisplayString = React.useMemo(() => {
    return formatToPhp(props.amount);
  }, [props.amount]);

  const animateButton = () => {
    if (props.isReadOnly) return;

    longPressBackgroundColor.value = withSequence(
      withSpring(theme.colors.secondaryContainer),
      withDelay(200, withSpring(theme.colors.background)),
    );
  };

  const goToViewExpensesPage = () => {
    if (props.isReadOnly) return;

    if (props.navigation) {
      props.navigation.navigate('Per Salary Expenses', {
        salaryId: props.id as number,
      });
    }
  };

  const goToEditSalaryPage = () => {
    if (props.isReadOnly) return;

    if (props.navigation) {
      const targetSalary: ISalaryRecord = {
        id: props.id,
        description: props.description,
        amount: props.amount,
        accounting_date: props.accounting_date,
      };
      props.navigation.navigate('Edit Salary', {salaryItem: targetSalary});
    }
  };

  const handleSalaryRecordPinning = async () => {
    const salaryId = (props as ISalaryRecord).id as number;
    const db = await getDBConnection();
    if (!isPinned) {
      await addSalaryRecordPin(db, salaryId);
    } else {
      await deleteSalaryRecordPin(db, salaryId);
    }

    try {
      const db = await getDBConnection();
      const result = await getPinnedSalaryRecords(db);
      console.log(result[0].rows.raw());
      setPinnedSalaryRecords(result[0].rows.raw());
    } catch (error) {
      console.error('post-handling get pinned salary records rejected');
      console.error(error);
    }
    setIsPinned(!isPinned);
  };

  return (
    <Pressable
      onPress={goToViewExpensesPage}
      onLongPress={goToEditSalaryPage}
      onPressIn={animateButton}
      style={[styles.salaryItem, {backgroundColor: theme.colors.surface}]}>
      <Surface style={{backgroundColor: theme.colors.surface}}>
        <Animated.View
          style={[
            styles.salaryItemInnerContainer,
            {backgroundColor: longPressBackgroundColor},
          ]}>
          <View style={[styles.detailsContainer]}>
            <View>
              <Text style={[styles.itemFontStyle, styles.descriptionText]}>
                {props.description}
              </Text>
              <Text style={styles.itemFontStyle}>Recorded on:</Text>
              <Text style={styles.itemFontStyle}>{dateDisplayString}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.itemFontStyle}>{currencyDisplayString}</Text>
              {props.isReadOnly ? (
                <IconButton
                  icon={isPinned ? 'pin-off' : 'pin'}
                  size={FONT_SIZE * 1.25}
                  iconColor={theme.colors.primary}
                  onPress={handleSalaryRecordPinning}
                />
              ) : null}
            </View>
          </View>
          {props.isPinnedAndIsUnderSalaryListComponent ? (
            <Surface style={styles.pinContainer}>
              <Icon source="pin" size={FONT_SIZE} />
            </Surface>
          ) : null}
        </Animated.View>
      </Surface>
    </Pressable>
  );
};

export default SalaryItem;
