import * as React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import DeleteSalaryConfirmationDialog from '../components/DeleteSalaryConfirmationDialog';
import FormCharField from '../components/FormCharField';
import FormNumberField from '../components/FormNumberField';
import DateTimePicker from '../components/DateTimePicker';
import {useForm} from 'react-hook-form';
import 'intl';
import 'intl/locale-data/jsonp/en';
import EditSalaryFormStyles from '../styles/EditSalaryFormStyles';
import CommonStyles from '../styles/CommonStyles';
import {ISalaryRecord} from '../schemas/salaries';
import {
  getDBConnection,
  editSalaryRecord,
  getSalaryRecords,
} from '../services/database';
import useSalaryRecordStore from '../stores/SalaryStore';

const styles = EditSalaryFormStyles;

const EditSalaryForm = ({navigation, route}) => {
  const setSalaryRecords = useSalaryRecordStore(
    state => state.setSalaryRecords,
  );

  const {salaryItem} = route.params;

  const form = useForm({
    defaultValues: {
      description: salaryItem ? salaryItem.description : '',
      amount: salaryItem ? salaryItem.amount : 0,
      accounting_date: salaryItem ? salaryItem.accounting_date : '',
    },
  });

  const onSubmit = async () => {
    const data: ISalaryRecord = form.getValues();
    if (!data.accounting_date) {
      data.accounting_date = new Date().toISOString();
    }

    const db = await getDBConnection();

    await editSalaryRecord(db, {
      ...data,
      id: salaryItem.id,
      created_at: new Date() as unknown as string,
    });

    const newSalaryRecords = await getSalaryRecords(db);
    setSalaryRecords(newSalaryRecords[0].rows.raw());
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={CommonStyles.headerText}>Edit Salary Record</Text>
        <DeleteSalaryConfirmationDialog
          salaryItem={salaryItem}
          navigation={navigation}
        />
      </View>
      <FormCharField
        label="Description"
        name="description"
        control={form.control}
        rules={{
          required: true,
        }}
      />
      <View style={styles.amountInputContainer}>
        <FormNumberField
          label="Amount"
          name="amount"
          control={form.control}
          rules={{
            required: true,
          }}
          style={styles.amountPesos}
        />
      </View>
      {/*<FormCharField
        label="Date"
        name="accounting_date"
        control={form.control}
        rules={{
          required: false,
        }}
      />*/}
      <DateTimePicker
        dateTime={form.getValues().accounting_date}
        setDateTime={value => form.setValue('accounting_date', value)}
      />
      <View style={styles.submitButtonContainer}>
        <Button mode="contained" onPress={onSubmit}>
          Update Salary Record
        </Button>
      </View>
    </View>
  );
};

export default EditSalaryForm;
