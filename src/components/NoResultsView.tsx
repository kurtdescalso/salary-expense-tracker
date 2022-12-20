import * as React from "react";
import {View, Text} from "react-native";
import NoResultsViewStyles from "../styles/NoResultsViewStyles";

const styles = NoResultsViewStyles;

interface INoResultsViewProps {
  message: string;
}

const NoResultsView = (props: INoResultsViewProps) => {
  return (
    <View style={styles.noResultsContainer}>
      <Text style={styles.noResultsText}>{props.message}</Text>
    </View>
  )
}

export default NoResultsView;
