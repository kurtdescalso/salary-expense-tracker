import * as React from 'react';
import {IconButton, Menu, useTheme} from 'react-native-paper';
import {ICategoryOptionWithCheckFlag} from '../../constants';
import ExpenseListFilterMenuListItem from './expense-list-filter-menu-list-item/ExpenseListFilterMenuListItem';

interface IExpenseListFilterMenuProps {
  selectedCategories: ICategoryOptionWithCheckFlag[];
  handleSetSelectedCategories: (category: ICategoryOptionWithCheckFlag) => void;
  selectAllCategoriesCallback: () => void;
  deselectAllCategoriesCallback: () => void;
}

const ExpenseListFilterMenu = (props: IExpenseListFilterMenuProps) => {
  const theme = useTheme();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleDismissMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Menu
      visible={isMenuOpen}
      onDismiss={handleDismissMenu}
      anchor={
        <IconButton
          icon="shape-plus"
          color={theme.colors.surface}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        />
      }>
      {props.selectedCategories.map((option, index) => {
        return (
          <ExpenseListFilterMenuListItem
            key={`expense-list-filter-menu-list-item-${option.value}-${index}`}
            category={option}
            handleSetSelectedCategories={props.handleSetSelectedCategories}
          />
        );
      })}
      <Menu.Item
        title="Select All"
        onPress={props.selectAllCategoriesCallback}
      />
      <Menu.Item
        title="Deselect All"
        onPress={props.deselectAllCategoriesCallback}
      />
    </Menu>
  );
};

export default ExpenseListFilterMenu;
