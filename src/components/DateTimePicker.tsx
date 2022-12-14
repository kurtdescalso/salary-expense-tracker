import * as React from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Text} from 'react-native-paper';
import {addTZOffset} from '../utils/datetime';
import DateTimePickerStyles from '../styles/DateTimePickerStyles';
import {CombinedDefaultTheme} from '../styles/Theme';

interface IDateTimePickerProps {
  dateTime: Date;
  setDateTime: (date: Date) => void;
}

const styles = DateTimePickerStyles;

const DateTimePicker = (props: IDateTimePickerProps) => {
  const [internalDate, setInternalDate] = React.useState(new Date());
  const [internalTime, setInternalTime] = React.useState(new Date());

  const setExternalDate = (date: Date) => {
    props.dateTime.setUTCFullYear(date.getFullYear());
    props.dateTime.setMonth(date.getMonth());
    props.dateTime.setDate(date.getDate());
    props.setDateTime(props.dateTime);
  };

  const setExternalTime = (time: Date) => {
    props.dateTime.setHours(time.getHours());
    props.dateTime.setMinutes(time.getMinutes());
    props.setDateTime(props.dateTime);
  };

  const handleSetDate = (date: Date) => {
    setInternalDate(date);
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      props.dateTime.getHours(),
      props.dateTime.getMinutes(),
      props.dateTime.getSeconds(),
    );
    setExternalDate(newDate);
  };

  const handleSetTime = (time: Date) => {
    setInternalTime(time);
    const newTime = addTZOffset(
      new Date(
        props.dateTime.getFullYear(),
        props.dateTime.getMonth(),
        props.dateTime.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
      ),
    );
    setExternalTime(newTime);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.dateTimeLabel}>Date & Time</Text>
      </View>
      <View style={styles.controlsContainer}>
        <DatePicker
          date={internalDate}
          mode="date"
          onDateChange={handleSetDate}
          fadeToColor={CombinedDefaultTheme.colors.background}
        />
        <DatePicker
          date={internalTime}
          mode="time"
          onDateChange={handleSetTime}
          fadeToColor={CombinedDefaultTheme.colors.background}
        />
      </View>
    </View>
  );
};

export default DateTimePicker;
