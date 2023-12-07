import React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Paragraph, Portal, Text} from 'react-native-paper';
import {ISalaryRecord} from '../../schemas/salaries';
import {getDBConnection} from '../../services/database';
import {deleteSalaryRecord, getSalaryRecords} from '../../services/salary';
import useSalaryRecordStore from '../../stores/SalaryStore';

interface IDeleteSalaryConfirmationDialog {
  salaryItem: ISalaryRecord;
  navigation: any;
}

const DeleteSalaryConfirmationDialog = (
  props: IDeleteSalaryConfirmationDialog,
) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const setSalaryRecords = useSalaryRecordStore(
    state => state.setSalaryRecords,
  );

  const handleDelete = async () => {
    setIsLoading(true);

    const db = await getDBConnection();

    try {
      await deleteSalaryRecord(db, props.salaryItem);
      const newSalaryRecords = await getSalaryRecords(db);
      setSalaryRecords(newSalaryRecords[0].rows.raw());
    } catch (e) {
      console.log('delete salary record rejected');
      console.log(e);
    }

    setIsLoading(false);
    props.navigation.navigate('Dashboard');
  };

  return (
    <View>
      <Button icon="trash-can" color="red" onPress={() => setIsOpen(true)}>
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
              color="red"
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
