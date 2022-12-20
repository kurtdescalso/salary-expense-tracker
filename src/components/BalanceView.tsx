import * as React from "react";
import {View, Text} from "react-native";
import BalanceViewStyles from "../styles/BalanceViewStyles";

const styles = BalanceViewStyles;

interface IBalanceViewProps {
  balance: number;
}

const BalanceView = (props: IBalanceViewProps) => {
  return (
    <View style={styles.balanceFooter}>
      <Text>Balance:</Text>
      <Text
        style={
          props.balance > 0
            ? styles.balanceFooterAmountPositive
            : styles.balanceFooterAmountNegative
        }>
        {props.balance.toFixed(2)}
      </Text>
    </View>
  )
}

export default BalanceView;
