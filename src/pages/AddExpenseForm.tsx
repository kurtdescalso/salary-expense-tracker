import * as React from 'react';
import {View} from 'react-native';
import {Button, ProgressBar, Text} from 'react-native-paper';
import FormCharField from '../components/FormCharField';
import FormNumberField from '../components/FormNumberField';
import DateTimePicker from '../components/DateTimePicker';
import {useForm} from 'react-hook-form';
import 'intl';
import 'intl/locale-data/jsonp/en';
import AddExpenseFormStyles from '../styles/AddExpenseFormStyles';
import CommonStyles from '../styles/CommonStyles';
import {
  getDBConnection,
  addExpenseRecord,
  getSalaryRecords,
  getExpensesBySalaryRecordId,
} from '../services/database';
import useSalaryRecordStore from '../stores/SalaryStore';

const styles = AddExpenseFormStyles;

const AddExpenseForm = ({_navigation, route}) => {
  const {salaryId} = route.params;

  const [isLoading, setIsLoading] = React.useState(false);

  const setSalaryRecords = useSalaryRecordStore(
    state => state.setSalaryRecords,
  );
  const setExpenseRecords = useSalaryRecordStore(
    state => state.setExpenseRecords,
  );

  const form = useForm({
    defaultValues: {
      description: '',
      amount: 0,
      accounting_date: new Date(),
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    const data = form.getValues();
    if (!data.accounting_date) {
      data.accounting_date = new Date();
    }

    const db = await getDBConnection();

    await addExpenseRecord(db, {
      ...data,
      salary_id: salaryId,
      accounting_date: data.accounting_date.toISOString(),
      created_at: new Date().toISOString(),
    });

    const newSalaryRecords = await getSalaryRecords(db);
    setSalaryRecords(newSalaryRecords[0].rows.raw());

    const newExpenseRecords = await getExpensesBySalaryRecordId(db, salaryId);
    setExpenseRecords(newExpenseRecords[0].rows.raw());

    form.reset({
      accounting_date: data.accounting_date,
    });

    setIsLoading(false);
  };

  return (
    <View>
      <Text style={CommonStyles.headerText}>Add Expense Record</Text>
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
      <DateTimePicker
        dateTime={form.getValues().accounting_date}
        setDateTime={value => form.setValue('accounting_date', value)}
      />
      <View style={styles.submitButtonContainer}>
        <Button mode="contained" onPress={onSubmit}>
          Save Expense Record
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

export default AddExpenseForm;
