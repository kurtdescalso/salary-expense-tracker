import * as React from 'react';
import {View} from 'react-native';
import {
  useTheme,
  Surface,
  Button,
  TouchableRipple,
  Text,
} from 'react-native-paper';
import {AppStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './BottomTabsStyles';

type BottomTabsNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'Salary List' | 'Expense View'
>;

const BottomTabs = (navigation: BottomTabsNavigationProp) => {
  const theme = useTheme();

  const goToSalaryList = () => {
    ((navigation as any).navigation as BottomTabsNavigationProp).navigate(
      'Salary List',
    );
  };

  const goToExpenseView = () => {
    ((navigation as any).navigation as BottomTabsNavigationProp).navigate(
      'Expense View',
    );
  };

  return (
    <View>
      <Surface style={styles.navButtonsContainer}>
        <Button
          icon="account-cash"
          color={theme.colors.onSurface}
          onPress={goToSalaryList}
          style={styles.navButton}>
          Salary List
        </Button>
        <Button
          icon="archive-search"
          color={theme.colors.onSurface}
          onPress={goToExpenseView}
          style={styles.navButton}>
          Expense View
        </Button>
      </Surface>
    </View>
  );
};

export default BottomTabs;
