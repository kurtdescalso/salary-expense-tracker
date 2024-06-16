import * as React from 'react';
import {View} from 'react-native';
import {Button, ProgressBar, Text} from 'react-native-paper';
import {SalaryExpenseManagementStackParamList} from '../../stacks/SalaryExpenseManagementStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DeleteSalaryConfirmationDialog from '../../components/delete-salary-confirmation-dialog/DeleteSalaryConfirmationDialog';
import FormCharField from '../../components/form-char-field/FormCharField';
import FormNumberField from '../../components/form-number-field/FormNumberField';
import DateTimePicker from '../../components/date-time-picker/DateTimePicker';
import {useForm} from 'react-hook-form';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {ISalaryRecord} from '../../schemas/salaries';
import {getDBConnection} from '../../services/database';
import {editSalaryRecord, getSalaryRecords} from '../../services/salary';
import useSalaryRecordStore from '../../stores/SalaryStore';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {formatToStandardDateTimeWithSeconds} from '../../utils/datetime';
import CommonStyles from '../../styles/CommonStyles';
import styles from './EditSalaryFormStyles';

type EditSalaryFormStackScreenProps<
  T extends keyof SalaryExpenseManagementStackParamList,
> = NativeStackScreenProps<SalaryExpenseManagementStackParamList, T>;

const EditSalaryForm = ({
  route,
}: EditSalaryFormStackScreenProps<'Edit Salary'>) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigation = useNavigation();

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
    setIsLoading(true);

    const data: ISalaryRecord = form.getValues();
    if (!data.accounting_date) {
      data.accounting_date = new Date().toISOString();
    }

    const db = await getDBConnection();

    await editSalaryRecord(db, {
      ...data,
      id: salaryItem.id,
      created_at: formatToStandardDateTimeWithSeconds(new Date()),
    });

    const newSalaryRecords = await getSalaryRecords(db);
    setSalaryRecords(newSalaryRecords[0].rows.raw());

    form.reset();
    setIsLoading(false);
    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={CommonStyles.headerText}>Edit Salary Record</Text>
        <DeleteSalaryConfirmationDialog salaryItem={salaryItem} />
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
        setDateTime={value => {
          form.setValue(
            'accounting_date',
            formatToStandardDateTimeWithSeconds(value),
          );
        }}
      />
      <View style={styles.submitButtonContainer}>
        <Button mode="contained" onPress={onSubmit}>
          Update Salary Record
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

export default EditSalaryForm;
