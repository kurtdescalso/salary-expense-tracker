import * as React from 'react';
import {View} from 'react-native';
import {Surface, TouchableRipple, Text} from 'react-native-paper';
import {AppStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BottomTabsStyles from '../styles/BottomTabsStyles';

const styles = BottomTabsStyles;

type BottomTabsNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'Dashboard' | 'Stats'
>;

const BottomTabs = (navigation: BottomTabsNavigationProp) => {
  const goToDashboard = () => {
    ((navigation as any).navigation as BottomTabsNavigationProp).navigate(
      'Dashboard',
    );
  };

  const goToStats = () => {
    ((navigation as any).navigation as BottomTabsNavigationProp).navigate(
      'Stats',
    );
  };

  return (
    <View>
      <Surface style={styles.navButtonsContainer}>
        <TouchableRipple onPress={goToDashboard} style={styles.navButton}>
          <Text style={styles.navButtonLabel}>Salary List</Text>
        </TouchableRipple>
        <TouchableRipple onPress={goToStats} style={styles.navButton}>
          <Text style={styles.navButtonLabel}>Expense View</Text>
        </TouchableRipple>
      </Surface>
    </View>
  );
};

export default BottomTabs;
