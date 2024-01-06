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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {CombinedDefaultTheme, CombinedDarkTheme} from './src/styles/Theme';
import {useColorScheme} from 'react-native';
import AppBar from './src/components/app-bar/AppBar';

import SalaryListPage from './src/pages/salary-list/SalaryList';
import ExpenseViewPage from './src/pages/expense-view/ExpenseView';
import PerSalaryExpenseViewPage from './src/pages/per-salary-expense-view/PerSalaryExpenseView';
import AddSalaryForm from './src/pages/add-salary-form/AddSalaryForm';
import EditSalaryForm from './src/pages/edit-salary-form/EditSalaryForm';
import AddExpenseForm from './src/pages/add-expense-form/AddExpenseForm';
import EditExpenseForm from './src/pages/edit-expense-form/EditExpenseForm';
import {getDBConnection, createTables} from './src/services/database';

import {en, registerTranslation} from 'react-native-paper-dates';
registerTranslation('en', en);

import {IExpenseEntry, ISalaryRecord} from './src/schemas/salaries';

export type AppStackParamList = {
  Home: undefined;
  'Salary List': undefined;
  'Expense View': undefined;
  'Per Salary Expenses': {
    salaryId: number;
  };
  'Add Salary': undefined;
  'Edit Salary': {
    salaryItem: ISalaryRecord;
  };
  'Add Expense': {
    salaryId: number;
  };
  'Edit Expense': {
    expenseItem: IExpenseEntry;
  };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const App = (): React.JSX.Element => {
  const initializeDatabase = React.useCallback(async () => {
    const db = await getDBConnection();
    await createTables(db);
  }, []);

  const colorScheme = useColorScheme();

  React.useEffect(() => {
    initializeDatabase();
  }, [initializeDatabase]);

  return (
    <PaperProvider
      theme={colorScheme !== 'dark' ? CombinedDefaultTheme : CombinedDarkTheme}>
      <NavigationContainer
        theme={
          (colorScheme !== 'dark'
            ? CombinedDefaultTheme
            : CombinedDarkTheme) as unknown as Theme
        }>
        <Stack.Navigator
          initialRouteName="Salary List"
          screenOptions={{
            header: props => <AppBar {...props} />,
          }}>
          <Stack.Screen name="Salary List" component={SalaryListPage} />
          <Stack.Screen
            name="Expense View"
            component={ExpenseViewPage}
            options={{
              headerLeft: () => null,
              headerBackVisible: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="Per Salary Expenses"
            component={PerSalaryExpenseViewPage}
          />
          <Stack.Screen name="Add Salary" component={AddSalaryForm} />
          <Stack.Screen name="Edit Salary" component={EditSalaryForm} />
          <Stack.Screen name="Add Expense" component={AddExpenseForm} />
          <Stack.Screen name="Edit Expense" component={EditExpenseForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
