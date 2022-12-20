import * as React from 'react';
import {View} from 'react-native';
import {Button, ProgressBar, Text} from 'react-native-paper';
import FormCharField from '../components/FormCharField';
import FormNumberField from '../components/FormNumberField';
import DateTimePicker from '../components/DateTimePicker';
import {useForm} from 'react-hook-form';
import 'intl';
import 'intl/locale-data/jsonp/en';
import EditExpenseFormStyles from '../styles/EditExpenseFormStyles';
import CommonStyles from '../styles/CommonStyles';
import {
  getDBConnection,
  editExpenseRecord,
  getSalaryRecords,
  getExpensesBySalaryRecordId,
} from '../services/database';
import useSalaryRecordStore from '../stores/SalaryStore';
import DeleteExpenseConfirmationDialog from '../components/DeleteExpenseConfirmationDialog';
import {useNavigation} from '@react-navigation/native';

const styles = EditExpenseFormStyles;

const EditExpenseForm = ({route}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const navigation = useNavigation();

  const setSalaryRecords = useSalaryRecordStore(
    state => state.setSalaryRecords,
  );
  const setExpenseRecords = useSalaryRecordStore(
    state => state.setExpenseRecords,
  );

  const {expenseItem} = route.params;

  const form = useForm({
    defaultValues: {
      description: expenseItem ? expenseItem.description : '',
      amount: expenseItem ? expenseItem.amount : 0,
      accounting_date: expenseItem ? expenseItem.accounting_date : '',
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    const data = form.getValues();
    if (!data.accounting_date) {
      data.accounting_date = new Date();
    }

    const db = await getDBConnection();

    await editExpenseRecord(db, {
      ...data,
      id: expenseItem.id,
      salary_id: expenseItem.salary_id,
      accounting_date: data.accounting_date
        ? new Date(data.accounting_date).toISOString()
        : new Date().toISOString(),
      created_at: new Date().toISOString(),
    });

    const newSalaryRecords = await getSalaryRecords(db);
    setSalaryRecords(newSalaryRecords[0].rows.raw());

    const newExpenseRecords = await getExpensesBySalaryRecordId(
      db,
      expenseItem.salary_id,
    );
    setExpenseRecords(newExpenseRecords[0].rows.raw());

    setIsLoading(false);
    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={CommonStyles.headerText}>Edit Expense Record</Text>
        <DeleteExpenseConfirmationDialog
          expenseEntry={expenseItem}
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

export default EditExpenseForm;
