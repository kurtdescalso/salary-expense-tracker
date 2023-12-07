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
  'Dashboard' | 'Stats'
>;

const BottomTabs = (navigation: BottomTabsNavigationProp) => {
  const theme = useTheme();

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
        <Button
          icon="account-cash"
          color={theme.colors.onSurface}
          onPress={goToDashboard}
          style={styles.navButton}>
          Salary List
        </Button>
        <Button
          icon="archive-search"
          color={theme.colors.onSurface}
          onPress={goToStats}
          style={styles.navButton}>
          Expense View
        </Button>
      </Surface>
    </View>
  );
};

export default BottomTabs;
