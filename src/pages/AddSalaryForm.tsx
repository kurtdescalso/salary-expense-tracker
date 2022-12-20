import * as React from 'react';
import {View} from 'react-native';
import {Button, ProgressBar, Text} from 'react-native-paper';
import FormCharField from '../components/FormCharField';
import FormNumberField from '../components/FormNumberField';
import DateTimePicker from '../components/DateTimePicker';
import {useForm} from 'react-hook-form';
import 'intl';
import 'intl/locale-data/jsonp/en';
import AddSalaryFormStyles from '../styles/AddSalaryFormStyles';
import CommonStyles from '../styles/CommonStyles';
import {ISalaryRecord} from '../schemas/salaries';
import {
  getDBConnection,
  addSalaryRecord,
  getSalaryRecords,
} from '../services/database';
import useSalaryRecordStore from '../stores/SalaryStore';

const styles = AddSalaryFormStyles;

const AddSalaryForm = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const setSalaryRecords = useSalaryRecordStore(
    state => state.setSalaryRecords,
  );

  const form = useForm({
    defaultValues: {
      description: '',
      amount: 0,
      accounting_date: new Date(),
    },
  });

  const onSubmit = async event => {
    event.persist();
    setIsLoading(true);

    const data: ISalaryRecord = form.getValues();
    if (!data.accounting_date) {
      data.accounting_date = new Date();
    }

    const db = await getDBConnection();

    await addSalaryRecord(db, {
      ...data,
      created_at: new Date(),
    });

    const newSalaryRecords = await getSalaryRecords(db);
    setSalaryRecords(newSalaryRecords[0].rows.raw());

    form.reset();
    setIsLoading(false);
  };

  return (
    <View>
      <Text style={CommonStyles.headerText}>Add Salary Record</Text>
      <FormCharField
        label="Description"
        name="description"
        control={form.control}
        rules={{
          required: true,
        }}
      />
      <View>
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
      <DateTimePicker
        dateTime={form.getValues().accounting_date}
        setDateTime={value => form.setValue('accounting_date', value)}
      />
      <View style={styles.submitButtonContainer}>
        <Button mode="contained" onPress={onSubmit}>
          Save Salary Record
        </Button>
      </View>
      {isLoading ? (
        <View>
          <ProgressBar indeterminate />
        </View>
      ) : null}
    </View>
  );
};

export default AddSalaryForm;
