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

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CombinedDefaultTheme, CombinedDarkTheme} from './src/styles/Theme';
import AppBar from './src/components/AppBar';

import DashboardPage from './src/pages/Dashboard';
import ExpensesViewPage from './src/pages/ExpensesView';
import AddSalaryForm from './src/pages/AddSalaryForm';
import EditSalaryForm from './src/pages/EditSalaryForm';
import AddExpenseForm from './src/pages/AddExpenseForm';
import EditExpenseForm from './src/pages/EditExpenseForm';
import {getDBConnection, createTables} from './src/services/database';

import {en, registerTranslation} from 'react-native-paper-dates';
registerTranslation('en', en);

import {IExpenseEntry, ISalaryRecord} from './src/schemas/salaries';

const Stack = createNativeStackNavigator();

export type AppStackParamList = {
  Dashboard: undefined;
  Expenses: {
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

const App = () => {
  const initializeDatabase = React.useCallback(async () => {
    const db = await getDBConnection();
    await createTables(db);
  }, []);

  React.useEffect(() => {
    initializeDatabase();
  }, [initializeDatabase]);

  return (
    <NavigationContainer theme={CombinedDefaultTheme}>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          header: props => <AppBar {...props} />,
        }}>
        <Stack.Screen name="Dashboard" component={DashboardPage} />
        <Stack.Screen name="Expenses" component={ExpensesViewPage} />
        <Stack.Screen name="Add Salary" component={AddSalaryForm} />
        <Stack.Screen name="Edit Salary" component={EditSalaryForm} />
        <Stack.Screen name="Add Expense" component={AddExpenseForm} />
        <Stack.Screen name="Edit Expense" component={EditExpenseForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
