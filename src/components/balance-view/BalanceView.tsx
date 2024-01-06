import * as React from 'react';
import {View} from 'react-native';
import {Surface, Text, useTheme} from 'react-native-paper';
import {formatToPhp} from '../../utils/currency';
import styles from './BalanceViewStyles';

interface IBalanceViewProps {
  balance: number;
}

const BalanceView = (props: IBalanceViewProps) => {
  const theme = useTheme();

  return (
    <Surface
      style={[styles.balanceFooter, {backgroundColor: theme.colors.surface}]}>
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
    </Surface>
  );
};

export default BalanceView;
