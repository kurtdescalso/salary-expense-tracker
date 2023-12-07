import * as React from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-paper';
import {formatToPhp} from '../../utils/currency';
import styles from './BalanceViewStyles';

interface IBalanceViewProps {
  balance: number;
}

const BalanceView = (props: IBalanceViewProps) => {
  return (
    <Card style={styles.balanceFooter}>
      <View style={styles.innerFlexContainer}>
        <Text>Balance:</Text>
        <Text
          style={
            props.balance > 0
              ? styles.balanceFooterAmountPositive
              : styles.balanceFooterAmountNegative
          }>
          {formatToPhp(props.balance)}
        </Text>
      </View>
    </Card>
  );
};

export default BalanceView;
