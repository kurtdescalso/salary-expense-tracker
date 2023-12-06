import * as React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {IExpenseEntry} from '../schemas/salaries';
import DynamicExpenseItemStyles from '../styles/DynamicExpenseItemStyles';
import {formatToPhp} from '../utils/currency';

const styles = DynamicExpenseItemStyles;

interface IDynamicExpenseItemProps {
  expense: IExpenseEntry;
}

const DynamicExpenseItem = (props: IDynamicExpenseItemProps) => {
  return (
    <Card style={styles.mainContainer}>
      <View style={styles.detailsContainer}>
        <Text>{props.expense.description}</Text>
        <Text>{formatToPhp(props.expense.amount)}</Text>
      </View>
    </Card>
  );
};

export default DynamicExpenseItem;
