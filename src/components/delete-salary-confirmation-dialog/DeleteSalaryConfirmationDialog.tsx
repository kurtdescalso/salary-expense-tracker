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
import {ISalaryRecord} from '../../schemas/salaries';
import {useNavigation} from '@react-navigation/native';
import {getDBConnection} from '../../services/database';
import {deleteSalaryRecord, getSalaryRecords} from '../../services/salary';
import {getAllExpenses} from '../../services/expense';
import useSalaryRecordStore from '../../stores/SalaryStore';
import {SalaryExpenseManagementStackParamList} from '../../stacks/SalaryExpenseManagementStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './DeleteSalaryConfirmationDialogStyles';

type DeleteSalaryConfirmationDialogNavigationProps = NativeStackNavigationProp<
  SalaryExpenseManagementStackParamList,
  'Salary List'
>;

interface IDeleteSalaryConfirmationDialog {
  salaryItem: ISalaryRecord;
}

const DeleteSalaryConfirmationDialog = (
  props: IDeleteSalaryConfirmationDialog,
) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigation =
    useNavigation<DeleteSalaryConfirmationDialogNavigationProps>();

  const setSalaryRecords = useSalaryRecordStore(
    state => state.setSalaryRecords,
  );
  const setAllExpensesRecords = useSalaryRecordStore(
    state => state.setAllExpenseRecords,
  );

  const handleDelete = async () => {
    setIsLoading(true);

    const db = await getDBConnection();

    try {
      await deleteSalaryRecord(db, props.salaryItem);

      const newSalaryRecords = await getSalaryRecords(db);
      setSalaryRecords(newSalaryRecords[0].rows.raw());

      const newAllExpenseRecords = await getAllExpenses(db);
      setAllExpensesRecords(newAllExpenseRecords[0].rows.raw());
    } catch (e) {
      console.log('delete salary record rejected');
      console.log(e);
    } finally {
      setIsLoading(false);
      navigation.navigate('Salary List');
    }
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
          <Dialog.Title>Delete Salary Record</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to delete this salary record?
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

export default DeleteSalaryConfirmationDialog;
