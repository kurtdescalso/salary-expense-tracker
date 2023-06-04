import * as React from 'react';
import {View} from 'react-native';
import {Button, ProgressBar, Text} from 'react-native-paper';
import FormCharField from '../components/FormCharField';
import FormNumberField from '../components/FormNumberField';
import DateTimePicker from '../components/DateTimePicker';
import {useForm} from 'react-hook-form';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {ISalaryRecord} from '../schemas/salaries';
import {getDBConnection} from '../services/database';
import {addSalaryRecord, getSalaryRecords} from '../services/salary';
import useSalaryRecordStore from '../stores/SalaryStore';
import FormSelectField from '../components/FormSelectField';
import {CATEGORY_OPTIONS} from '../constants';
import {format, parse} from 'date-fns';
import CommonStyles from '../styles/CommonStyles';
import AddSalaryFormStyles from '../styles/AddSalaryFormStyles';

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
      accounting_date: format(new Date(), 'uuuu-MM-dd'),
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);

    const data: ISalaryRecord = form.getValues();
    if (!data.accounting_date) {
      data.accounting_date = format(new Date(), 'uuuu-MM-dd');
    }

    const db = await getDBConnection();

    await addSalaryRecord(db, {
      ...data,
      created_at: format(new Date(), 'uuuu-MM-dd'),
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
      <FormSelectField
        label="Category"
        name="category"
        control={form.control}
        rules={{required: true}}
        options={CATEGORY_OPTIONS}
      />
      <DateTimePicker
        dateTime={parse(
          form.getValues().accounting_date,
          'uuuu-MM-dd',
          new Date(),
        )}
        setDateTime={value =>
          form.setValue('accounting_date', format(value, 'uuuu-MM-dd'))
        }
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
