import * as React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {formatToPhp} from '../../utils/currency';
import styles from './TotalExpensesViewStyles';

interface ITotalExpensesViewProps {
  total: number;
}

const TotalExpensesView = (props: ITotalExpensesViewProps) => {
  return (
    <Card style={styles.mainContainer}>
      <View style={styles.detailsContainer}>
        <Text style={styles.totalExpenseHeaderLabel}>Total:</Text>
        <Text style={styles.totalExpenseLabel}>{formatToPhp(props.total)}</Text>
      </View>
    </Card>
  );
};

export default TotalExpensesView;
