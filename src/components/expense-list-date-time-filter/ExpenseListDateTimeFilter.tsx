import * as React from 'react';
import {View} from 'react-native';
import {useTheme, IconButton} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';

interface IExpenseListDateTimeFilterProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

interface IDateRangeSetterCallback {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const ExpenseListDateTimeFilter = (props: IExpenseListDateTimeFilterProps) => {
  const theme = useTheme();

  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = React.useState(false);

  const openModal = () => {
    setIsDateTimeModalOpen(true);
  };

  const dismissModal = () => {
    setIsDateTimeModalOpen(false);
  };

  const handleConfirmDateRange = React.useCallback(
    (range: IDateRangeSetterCallback) => {
      props.setStartDate(range.startDate);
      props.setEndDate(range.endDate);
      setIsDateTimeModalOpen(false);
    },
    [],
  );

  return (
    <View>
      <IconButton
        icon="clock"
        iconColor={theme.colors.inverseOnSurface}
        onPress={openModal}
      />
      <DatePickerModal
        locale="en"
        mode="range"
        visible={isDateTimeModalOpen}
        startDate={props.startDate}
        endDate={props.endDate}
        onConfirm={handleConfirmDateRange}
        onDismiss={dismissModal}
      />
    </View>
  );
};

export default ExpenseListDateTimeFilter;
