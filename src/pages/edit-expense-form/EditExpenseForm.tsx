import * as React from 'react';
import {View} from 'react-native';
import {Button, ProgressBar, Text} from 'react-native-paper';
import {SalaryExpenseManagementStackParamList} from '../../stacks/SalaryExpenseManagementStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FormCharField from '../../components/form-char-field/FormCharField';
import FormNumberField from '../../components/form-number-field/FormNumberField';
import FormSelectField from '../../components/form-select-field/FormSelectField';
import DateTimePicker from '../../components/date-time-picker/DateTimePicker';
import {useForm} from 'react-hook-form';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {getDBConnection} from '../../services/database';
import {
  editExpenseRecord,
  getAllExpenses,
  getExpensesBySalaryRecordId,
} from '../../services/expense';
import {getSalaryRecords} from '../../services/salary';
import useSalaryRecordStore from '../../stores/SalaryStore';
import DeleteExpenseConfirmationDialog from '../../components/delete-expense-confirmation-dialog/DeleteExpenseConfirmationDialog';
import {useNavigation} from '@react-navigation/native';
import {formatToStandardDateTimeWithSeconds} from '../../utils/datetime';
import {CATEGORY_OPTIONS} from '../../constants';
import CommonStyles from '../../styles/CommonStyles';
import styles from './EditExpenseFormStyles';

type EditExpenseFormStackScreenProps<
  T extends keyof SalaryExpenseManagementStackParamList,
> = NativeStackScreenProps<SalaryExpenseManagementStackParamList, T>;

const EditExpenseForm = ({
  route,
}: EditExpenseFormStackScreenProps<'Edit Expense'>) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const navigation = useNavigation();

  const setSalaryRecords = useSalaryRecordStore(
    state => state.setSalaryRecords,
  );
  const setExpenseRecords = useSalaryRecordStore(
    state => state.setExpenseRecords,
  );
  const setAllExpenses = useSalaryRecordStore(
    state => state.setAllExpenseRecords,
  );

  const {expenseItem} = route.params;

  const form = useForm({
    defaultValues: {
      description: expenseItem ? expenseItem.description : '',
      amount: expenseItem ? expenseItem.amount : 0,
      category: expenseItem ? expenseItem.category : '',
      accounting_date: expenseItem ? expenseItem.accounting_date : '',
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    const data = form.getValues();
    console.log('data.accounting_date:');
    console.log(data.accounting_date);
    if (!data.accounting_date) {
      data.accounting_date = formatToStandardDateTimeWithSeconds(new Date());
    }

    const db = await getDBConnection();

    await editExpenseRecord(db, {
      ...data,
      id: expenseItem.id,
      salary_id: expenseItem.salary_id,
      accounting_date:
        data.accounting_date || formatToStandardDateTimeWithSeconds(new Date()),
      created_at: formatToStandardDateTimeWithSeconds(new Date()),
    });

    const newSalaryRecords = await getSalaryRecords(db);
    setSalaryRecords(newSalaryRecords[0].rows.raw());

    const newExpenseRecords = await getExpensesBySalaryRecordId(
      db,
      expenseItem.salary_id,
    );
    setExpenseRecords(newExpenseRecords[0].rows.raw());

    const newAllExpenseRecords = await getAllExpenses(db);
    setAllExpenses(newAllExpenseRecords[0].rows.raw());

    setIsLoading(false);
    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={CommonStyles.headerText}>Edit Expense Record</Text>
        <DeleteExpenseConfirmationDialog expenseEntry={expenseItem} />
      </View>
      <FormCharField
        label="Description"
        name="description"
        control={form.control}
        rules={{
          required: true,
        }}
      />
      <FormNumberField
        label="Amount"
        name="amount"
        control={form.control}
        rules={{
          required: true,
        }}
        style={styles.amountPesos}
      />
      <FormSelectField
        label="Category"
        name="category"
        control={form.control}
        value={expenseItem ? expenseItem.category : undefined}
        rules={{required: true}}
        options={CATEGORY_OPTIONS}
      />
      <DateTimePicker
        dateTime={form.watch('accounting_date')}
        setDateTime={value => {
          form.setValue(
            'accounting_date',
            formatToStandardDateTimeWithSeconds(value),
          );
        }}
      />
      <View style={styles.submitButtonContainer}>
        <Button mode="contained" onPress={onSubmit}>
          Update Expense Record
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
