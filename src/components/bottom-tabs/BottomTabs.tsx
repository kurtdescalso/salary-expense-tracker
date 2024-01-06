import * as React from 'react';
import {View} from 'react-native';
import {useTheme, Surface, Button} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './BottomTabsStyles';

type BottomTabsNavigableRoutes = 'Salary List' | 'Expense View';

type BottomTabsNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'Salary List' | 'Expense View'
>;

const BottomTabs = () => {
  const route = useRoute();
  const theme = useTheme();
  const navigation = useNavigation<BottomTabsNavigationProp>();

  const navigateTo = (routeName: BottomTabsNavigableRoutes) => {
    navigation.navigate(routeName);
  };

  return (
    <View>
      <Surface
        style={[
          styles.navButtonsContainer,
          {backgroundColor: theme.colors.surface},
        ]}>
        <Button
          icon="account-cash"
          mode="text"
          textColor={
            route.name === 'Salary List'
              ? theme.colors.primary
              : theme.colors.onSurface
          }
          rippleColor="#ffffff00"
          onPress={() => navigateTo('Salary List')}
          style={styles.navButton}>
          Salary List
        </Button>
        <Button
          icon="archive-search"
          mode="text"
          textColor={
            route.name === 'Expense View'
              ? theme.colors.primary
              : theme.colors.onSurface
          }
          rippleColor="#ffffff00"
          onPress={() => navigateTo('Expense View')}
          style={styles.navButton}>
          Expense View
        </Button>
      </Surface>
    </View>
  );
};

export default BottomTabs;
