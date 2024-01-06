import * as React from 'react';
import {View} from 'react-native';
import {Surface, Text, useTheme} from 'react-native-paper';
import {formatToPhp} from '../../utils/currency';
import styles from './TotalExpensesViewStyles';

interface ITotalExpensesViewProps {
  total: number;
}

const TotalExpensesView = (props: ITotalExpensesViewProps) => {
  const theme = useTheme();

  return (
    <Surface
      style={[styles.mainContainer, {backgroundColor: theme.colors.surface}]}>
      <View style={styles.detailsContainer}>
        <Text style={styles.totalExpenseHeaderLabel}>Total:</Text>
        <Text style={styles.totalExpenseLabel}>{formatToPhp(props.total)}</Text>
      </View>
    </Surface>
  );
};

export default TotalExpensesView;
