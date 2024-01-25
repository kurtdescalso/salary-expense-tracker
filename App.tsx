/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {NavigationContainer, Theme} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import {CombinedDefaultTheme, CombinedDarkTheme} from './src/styles/Theme';
import {useColorScheme} from 'react-native';

import SalaryExpenseManagementStack from './src/stacks/SalaryExpenseManagementStack';
import ExpenseViewPage from './src/pages/expense-view/ExpenseView';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BOTTOM_TABBAR_HEIGHT, FONT_SIZE} from './src/constants';

import {
  getDBConnection,
  createTables,
  setupSQLite,
} from './src/services/database';

import {en, registerTranslation} from 'react-native-paper-dates';
registerTranslation('en', en);

export type AppTabParamList = {
  Home: undefined;
  'Expense View': undefined;
};

const Tab = createMaterialBottomTabNavigator();

const App = (): React.JSX.Element => {
  const initializeDatabase = React.useCallback(async () => {
    const db = await getDBConnection();
    await createTables(db);
    await setupSQLite(db);
  }, []);

  const colorScheme = useColorScheme();

  const selectedTheme = React.useMemo(() => {
    return colorScheme !== 'dark' ? CombinedDefaultTheme : CombinedDarkTheme;
  }, [colorScheme]);

  React.useEffect(() => {
    initializeDatabase();
  }, [initializeDatabase]);

  return (
    <PaperProvider theme={selectedTheme}>
      <NavigationContainer theme={selectedTheme as unknown as Theme}>
        <Tab.Navigator barStyle={{maxHeight: BOTTOM_TABBAR_HEIGHT}}>
          <Tab.Screen
            name="Salary Management"
            component={SalaryExpenseManagementStack}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="account-cash"
                  color={selectedTheme.colors.primary}
                  size={FONT_SIZE * 1.5}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Expense View"
            component={ExpenseViewPage}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="archive-search"
                  color={selectedTheme.colors.primary}
                  size={FONT_SIZE * 1.5}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
