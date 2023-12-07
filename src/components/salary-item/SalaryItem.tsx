import * as React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {ISalaryRecord} from '../../schemas/salaries';
import {formatToPhp} from '../../utils/currency';
import {parseIsoString, formatToStandardDate} from '../../utils/datetime';
import SalaryItemStyles from './SalaryItemStyles';

interface ISalaryItemProps {
  navigation?: any;
}

const styles = SalaryItemStyles;

const SalaryItem = (props: ISalaryItemProps & ISalaryRecord) => {
  const dateDisplayString = React.useMemo(() => {
    const newDateObject = parseIsoString(props.accounting_date);
    return formatToStandardDate(newDateObject);
  }, [props.accounting_date]);

  const currencyDisplayString = React.useMemo(() => {
    return formatToPhp(props.amount);
  }, [props.amount]);

  const goToViewExpensesPage = () => {
    if (props.navigation) {
      props.navigation.navigate('Expenses', {salaryId: props.id});
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
    <Card
      onPress={goToViewExpensesPage}
      onLongPress={goToEditSalaryPage}
      style={styles.salaryItem}>
      <View style={styles.salaryItemInnerContainer}>
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
      </View>
    </Card>
  );
};

export default SalaryItem;
