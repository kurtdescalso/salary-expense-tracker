import * as React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {ISalaryRecord} from '../schemas/salaries';
import SalaryItemStyles from '../styles/SalaryItemStyles';

interface ISalaryItemProps {
  navigation?: any;
}

const styles = SalaryItemStyles;

const SalaryItem = (props: ISalaryItemProps & ISalaryRecord) => {
  return (
    <Card
      onPress={() => {
        if (props.navigation) {
          props.navigation.navigate('Expenses', {salaryId: props.id});
        }
      }}
      onLongPress={() => {
        if (props.navigation) {
          const targetSalary: ISalaryRecord = {
            id: props.id,
            description: props.description,
            amount: props.amount,
            accounting_date: props.accounting_date,
          };
          props.navigation.navigate('Edit Salary', {salaryItem: targetSalary});
        }
      }}
      style={styles.salaryItem}>
      <View style={styles.salaryItemInnerContainer}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.tempFontStyle, styles.descriptionText]}>
            {props.description}
          </Text>
          <Text style={styles.tempFontStyle}>Recorded on:</Text>
          <Text style={styles.tempFontStyle}>
            {props.accounting_date as string}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.tempFontStyle}>{`P ${props.amount.toFixed(
            2,
          )}`}</Text>
        </View>
      </View>
    </Card>
  );
};

export default SalaryItem;
