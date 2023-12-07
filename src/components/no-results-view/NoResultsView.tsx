import * as React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styles from './NoResultsViewStyles';

interface INoResultsViewProps {
  message: string;
}

const NoResultsView = (props: INoResultsViewProps) => {
  return (
    <View style={styles.noResultsContainer}>
      <Text style={styles.noResultsText}>{props.message}</Text>
    </View>
  );
};

export default NoResultsView;
