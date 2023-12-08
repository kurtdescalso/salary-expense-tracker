import * as React from 'react';
import {View} from 'react-native';
import {Button, ProgressBar, Text} from 'react-native-paper';
import {AppStackParamList} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FormCharField from '../../components/form-char-field/FormCharField';
import FormNumberField from '../../components/form-number-field/FormNumberField';
import FormSelectField from '../../components/form-select-field/FormSelectField';
import DateTimePicker from '../../components/date-time-picker/DateTimePicker';
import {useForm} from 'react-hook-form';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {getDBConnection} from '../../services/database';
import {getSalaryRecords} from '../../services/salary';
import {
  addExpenseRecord,
  getExpensesBySalaryRecordId,
} from '../../services/expense';
import useSalaryRecordStore from '../../stores/SalaryStore';
import {CATEGORY_OPTIONS} from '../../constants';
import {format} from 'date-fns';
import CommonStyles from '../../styles/CommonStyles';
import styles from './AddExpenseFormStyles';

type AddExpenseFormStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const AddExpenseForm = ({
  route,
}: AddExpenseFormStackScreenProps<'Add Expense'>) => {
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
      category: '',
      accounting_date: format(new Date(), 'uuuu-MM-dd HH:mm:ss'),
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    const data = form.getValues();
    if (!data.accounting_date) {
      data.accounting_date = format(new Date(), 'uuuu-MM-dd HH:mm:ss');
    }

    const db = await getDBConnection();

    await addExpenseRecord(db, {
      ...data,
      salary_id: salaryId,
      accounting_date: data.accounting_date,
      created_at: format(new Date(), 'uuuu-MM-dd HH:mm:ss'),
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
      <FormSelectField
        label="Category"
        name="category"
        value={form.watch('category')}
        control={form.control}
        rules={{required: true}}
        options={CATEGORY_OPTIONS}
      />
      <DateTimePicker
        dateTime={form.getValues().accounting_date}
        setDateTime={value =>
          form.setValue('accounting_date', format(value, 'uuuu-MM-dd HH:mm:ss'))
        }
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
