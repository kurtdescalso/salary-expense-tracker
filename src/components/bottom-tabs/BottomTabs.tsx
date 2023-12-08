import * as React from 'react';
import {View} from 'react-native';
import {useTheme, Surface, Button} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {AppStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './BottomTabsStyles';

type BottomTabsNavigableRoutes = 'Salary List' | 'Expense View';

type BottomTabsNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  BottomTabsNavigableRoutes
>;

const BottomTabs = (navigation: BottomTabsNavigationProp) => {
  const route = useRoute();
  const theme = useTheme();

  const navigateTo = (routeName: BottomTabsNavigableRoutes) => {
    ((navigation as any).navigation as BottomTabsNavigationProp).navigate(
      routeName,
    );
  };

  return (
    <View>
      <Surface style={styles.navButtonsContainer}>
        <Button
          icon="account-cash"
          color={
            route.name === 'Salary List'
              ? theme.colors.primary
              : theme.colors.onSurface
          }
          onPress={() => navigateTo('Salary List')}
          style={styles.navButton}>
          Salary List
        </Button>
        <Button
          icon="archive-search"
          color={
            route.name === 'Expense View'
              ? theme.colors.primary
              : theme.colors.onSurface
          }
          onPress={() => navigateTo('Expense View')}
          style={styles.navButton}>
          Expense View
        </Button>
      </Surface>
    </View>
  );
};

export default BottomTabs;
