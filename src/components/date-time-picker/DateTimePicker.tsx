import * as React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates';
import {format, parse} from 'date-fns';
import {
  CalendarDate,
  SingleChange,
} from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import styles from './DateTimePickerStyles';

interface IDateTimePickerProps {
  dateTime: string;
  setDateTime: (date: Date) => void;
}

const DateTimePicker = (props: IDateTimePickerProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = React.useState(false);
  // const [internalCachedTime, setInternalCachedTime] = React.useState(
  //   new Date(),
  // );

  const openDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const closeDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  const openTimePicker = () => {
    setIsTimePickerOpen(true);
  };

  const closeTimePicker = () => {
    setIsTimePickerOpen(false);
  };

  const dateButtonLabel = React.useMemo(() => {
    try {
      const formattedTime = format(
        parse(props.dateTime, 'uuuu-MM-dd HH:mm:ss', new Date()),
        'uuuu-MM-dd',
      );
      return formattedTime;
    } catch (error) {
      console.log('dateButtonLabel error:');
      console.log(error);
      const formattedTime = format(new Date(), 'uuuu-MM-dd');
      return formattedTime;
    }
  }, [props.dateTime]);

  const timeButtonLabel = React.useMemo(() => {
    try {
      const formattedTime = format(
        parse(props.dateTime, 'uuuu-MM-dd HH:mm:ss', new Date()),
        'HH:mm',
      );
      return formattedTime;
    } catch (error) {
      console.log('timeButtonLabel error:');
      console.log(error);
      const formattedTime = format(new Date(), 'HH:mm');
      return formattedTime;
    }
  }, [props.dateTime]);

  const confirmDate: SingleChange = (data: {date: CalendarDate}) => {
    const processedDate = data.date as Date;
    /*
    if (internalCachedTime) {
      processedDate.setHours(
        internalCachedTime.getHours(),
        internalCachedTime.getMinutes(),
        internalCachedTime.getSeconds(),
        internalCachedTime.getMilliseconds(),
      );
    }
    */
    props.setDateTime(processedDate);
    closeDatePicker();
  };

  const confirmTime = (data: {hours: number; minutes: number}) => {
    const newDate = parse(props.dateTime, 'uuuu-MM-dd HH:mm:ss', new Date());
    newDate.setHours(data.hours);
    newDate.setMinutes(data.minutes);
    props.setDateTime(newDate);
    closeTimePicker();
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.controlLabels}>Date</Text>
      <Button
        mode="outlined"
        onPress={openDatePicker}
        style={styles.controlButton}>
        {dateButtonLabel}
      </Button>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={isDatePickerOpen}
        date={
          props.dateTime
            ? parse(props.dateTime, 'uuuu-MM-dd HH:mm:ss', new Date())
            : new Date()
        }
        onConfirm={confirmDate}
        onDismiss={closeDatePicker}
      />
      <Text style={styles.controlLabels}>Time</Text>
      <Button
        mode="outlined"
        onPress={openTimePicker}
        style={styles.controlButton}>
        {timeButtonLabel}
      </Button>
      <TimePickerModal
        locale="en"
        visible={isTimePickerOpen}
        onDismiss={closeTimePicker}
        onConfirm={confirmTime}
      />
    </View>
  );
};

export default DateTimePicker;
