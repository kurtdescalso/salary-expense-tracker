import * as React from 'react';
import {Checkbox} from 'react-native-paper';
import {ICategoryOptionWithCheckFlag} from '../../../constants';
import styles from './ExpenseListFilterMenuListItemStyles';

interface IExpenseListFilterMenuListItemProps {
  category: ICategoryOptionWithCheckFlag;
  handleSetSelectedCategories: (category: ICategoryOptionWithCheckFlag) => void;
}

const ExpenseListFilterMenuListItem = (
  props: IExpenseListFilterMenuListItemProps,
) => {
  const toggleCheck = () => {
    const newIsCheckedValue = !props.category.isChecked;
    props.handleSetSelectedCategories({
      ...props.category,
      isChecked: newIsCheckedValue,
    });
    // setIsChecked(newIsCheckedValue);
  };

  return (
    <Checkbox.Item
      label={props.category.label}
      status={props.category.isChecked ? 'checked' : 'unchecked'}
      onPress={toggleCheck}
    />
  );
};

export default ExpenseListFilterMenuListItem;
