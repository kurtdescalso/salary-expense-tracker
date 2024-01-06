import * as React from 'react';
import {Pressable, View} from 'react-native';
import {Surface, Text, useTheme} from 'react-native-paper';
import {ISalaryRecord} from '../../schemas/salaries';
import {formatToPhp} from '../../utils/currency';
import {parseIsoString, formatToStandardDate} from '../../utils/datetime';
import styles from './SalaryItemStyles';

interface ISalaryItemProps {
  navigation?: any;
}

const SalaryItem = (props: ISalaryItemProps & ISalaryRecord) => {
  const theme = useTheme();

  const dateDisplayString = React.useMemo(() => {
    try {
      const newDateObject = parseIsoString(props.accounting_date);
      return formatToStandardDate(newDateObject);
    } catch (error) {
      console.log(`set dateDisplayString error: ${error}`);
      return '';
    }
  }, [props.accounting_date]);

  const currencyDisplayString = React.useMemo(() => {
    return formatToPhp(props.amount);
  }, [props.amount]);

  const goToViewExpensesPage = () => {
    if (props.navigation) {
      props.navigation.navigate('Per Salary Expenses', {salaryId: props.id});
    }
  };

  const goToEditSalaryPage = () => {
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

  return (
    <Pressable
      onPress={goToViewExpensesPage}
      onLongPress={goToEditSalaryPage}
      style={[styles.salaryItem, {backgroundColor: theme.colors.surface}]}>
      <Surface
        style={[
          styles.salaryItemInnerContainer,
          {backgroundColor: theme.colors.surface},
        ]}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.itemFontStyle, styles.descriptionText]}>
            {props.description}
          </Text>
          <Text style={styles.itemFontStyle}>Recorded on:</Text>
          <Text style={styles.itemFontStyle}>{dateDisplayString}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.itemFontStyle}>{currencyDisplayString}</Text>
        </View>
      </Surface>
    </Pressable>
  );
};

export default SalaryItem;
