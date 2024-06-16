import * as React from 'react';
import {View} from 'react-native';
import {Button, ProgressBar, Text} from 'react-native-paper';
import FormCharField from '../../components/form-char-field/FormCharField';
import FormNumberField from '../../components/form-number-field/FormNumberField';
import DateTimePicker from '../../components/date-time-picker/DateTimePicker';
import {useForm} from 'react-hook-form';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {ISalaryRecord} from '../../schemas/salaries';
import {getDBConnection} from '../../services/database';
import {addSalaryRecord, getSalaryRecords} from '../../services/salary';
import useSalaryRecordStore from '../../stores/SalaryStore';
import {formatToStandardDateTimeWithSeconds} from '../../utils/datetime';
import CommonStyles from '../../styles/CommonStyles';
import styles from './AddSalaryFormStyles';

const AddSalaryForm = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const setSalaryRecords = useSalaryRecordStore(
    state => state.setSalaryRecords,
  );

  const form = useForm({
    defaultValues: {
      description: '',
      amount: 0,
      accounting_date: formatToStandardDateTimeWithSeconds(new Date()),
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);

    const data: ISalaryRecord = form.getValues();
    if (!data.accounting_date) {
      data.accounting_date = formatToStandardDateTimeWithSeconds(new Date());
    }

    const db = await getDBConnection();

    await addSalaryRecord(db, {
      ...data,
      created_at: formatToStandardDateTimeWithSeconds(new Date()),
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
      <FormNumberField
        label="Amount"
        name="amount"
        control={form.control}
        rules={{
          required: true,
        }}
        style={styles.amountPesos}
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
