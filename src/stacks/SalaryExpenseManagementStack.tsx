import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ISalaryRecord, IExpenseEntry} from '../schemas/salaries';
import AppBar from '../components/app-bar/AppBar';

// Pages
import SalaryListPage from '../pages/salary-list/SalaryList';
import PerSalaryExpenseViewPage from '../pages/per-salary-expense-view/PerSalaryExpenseView';
import AddSalaryForm from '../pages/add-salary-form/AddSalaryForm';
import EditSalaryForm from '../pages/edit-salary-form/EditSalaryForm';
import AddExpenseForm from '../pages/add-expense-form/AddExpenseForm';
import EditExpenseForm from '../pages/edit-expense-form/EditExpenseForm';

export type SalaryExpenseManagementStackParamList = {
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

const Stack =
  createNativeStackNavigator<SalaryExpenseManagementStackParamList>();

const SalaryExpenseManagementStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Salary List"
      screenOptions={{
        header: props => <AppBar {...props} />,
      }}>
      <Stack.Screen name="Salary List" component={SalaryListPage} />
      <Stack.Screen
        name="Per Salary Expenses"
        component={PerSalaryExpenseViewPage}
      />
      <Stack.Screen name="Add Salary" component={AddSalaryForm} />
      <Stack.Screen name="Edit Salary" component={EditSalaryForm} />
      <Stack.Screen name="Add Expense" component={AddExpenseForm} />
      <Stack.Screen name="Edit Expense" component={EditExpenseForm} />
    </Stack.Navigator>
  );
};

export default SalaryExpenseManagementStack;
