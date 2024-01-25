import React from 'react';
import {View} from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import {IExpenseEntry} from '../../schemas/salaries';
import {useNavigation} from '@react-navigation/native';
import {getDBConnection} from '../../services/database';
import {
  deleteExpenseRecord,
  getAllExpenses,
  getExpensesBySalaryRecordId,
} from '../../services/expense';
import {getSalaryRecords} from '../../services/salary';
import useSalaryRecordStore from '../../stores/SalaryStore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SalaryExpenseManagementStackParamList} from '../../stacks/SalaryExpenseManagementStack';
import styles from './DeleteExpenseConfirmationDialog';

type DeleteExpenseConfirmationDialogNavigationProps = NativeStackNavigationProp<
  SalaryExpenseManagementStackParamList,
  'Per Salary Expenses'
>;

interface IDeleteExpenseConfirmationDialog {
  expenseEntry: IExpenseEntry;
}

const DeleteExpenseConfirmationDialog = (
  props: IDeleteExpenseConfirmationDialog,
) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigation =
    useNavigation<DeleteExpenseConfirmationDialogNavigationProps>();

  const setSalaryRecords = useSalaryRecordStore(
    state => state.setSalaryRecords,
  );
  const setExpenseRecords = useSalaryRecordStore(
    state => state.setExpenseRecords,
  );
  const setAllExpenses = useSalaryRecordStore(
    state => state.setAllExpenseRecords,
  );

  const handleDelete = async () => {
    setIsLoading(true);

    const db = await getDBConnection();

    try {
      await deleteExpenseRecord(db, props.expenseEntry);

      const newSalaryRecords = await getSalaryRecords(db);
      setSalaryRecords(newSalaryRecords[0].rows.raw());
      const newExpenseRecords = await getExpensesBySalaryRecordId(
        db,
        props.expenseEntry.salary_id,
      );
      setExpenseRecords(newExpenseRecords[0].rows.raw());

      const newAllExpenseRecords = await getAllExpenses(db);
      setAllExpenses(newAllExpenseRecords[0].rows.raw());
    } catch (e) {
      console.log('delete expense record rejected');
      console.log(e);
    }

    setIsLoading(false);
    navigation.goBack();
  };

  return (
    <View>
      <Button
        icon="trash-can"
        textColor={theme.colors.error}
        onPress={() => setIsOpen(true)}>
        Delete
      </Button>
      <Portal>
        <Dialog visible={isOpen}>
          <Dialog.Title>Delete Expense Record</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to delete this expense record?
            </Paragraph>
            <Text>This cannot be undone.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              icon="trash-can"
              textColor={theme.colors.error}
              onPress={handleDelete}
              disabled={isLoading}>
              Delete
            </Button>
            <Button onPress={() => setIsOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DeleteExpenseConfirmationDialog;
