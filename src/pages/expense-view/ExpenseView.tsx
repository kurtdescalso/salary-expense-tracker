import * as React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  View,
  FlatList,
} from 'react-native';
import {IconButton, Searchbar, useTheme} from 'react-native-paper';
import NoResultsView from '../../components/no-results-view/NoResultsView';
import DynamicExpenseItem from '../../components/dynamic-expense-item/DynamicExpenseItem';
import TotalExpensesView from '../../components/total-expenses-view/TotalExpensesView';
import {getAllExpenses} from '../../services/expense';
import {getDBConnection} from '../../services/database';
import {IExpenseEntry} from '../../schemas/salaries';
import useSalaryRecordStore from '../../stores/SalaryStore';
import ExpenseListFilterMenu from '../../components/expense-list-filter-menu/ExpenseListFilterMenu';
import {
  BOTTOM_TABBAR_HEIGHT,
  CATEGORY_OPTIONS_WITH_CHECK_FLAG,
  ICategoryOptionWithCheckFlag,
} from '../../constants';
import {isAfter, isBefore, isEqual, parse} from 'date-fns';
import ExpenseListDateTimeFilter from '../../components/expense-list-date-time-filter/ExpenseListDateTimeFilter';
import styles from './ExpenseViewStyles';

const ExpenseViewPage = () => {
  const theme = useTheme();

  const allExpenses = useSalaryRecordStore(state => state.allExpenseRecords);
  const setAllExpenses = useSalaryRecordStore(
    state => state.setAllExpenseRecords,
  );

  const [searchQuery, setSearchQuery] = React.useState('');

  const [isCompactView, setIsCompactView] = React.useState(false);
  const toggleCompactView = () => {
    setIsCompactView(!isCompactView);
  };

  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);

  const [selectedCategories, setSelectedCategories] = React.useState<
    ICategoryOptionWithCheckFlag[]
  >(CATEGORY_OPTIONS_WITH_CHECK_FLAG);

  const handleSetSelectedCategories = (
    targetCategory: ICategoryOptionWithCheckFlag,
  ) => {
    // NOTE: Preserves the order of category filter checkboxes
    let targetCategoryIndex = 0;
    for (let i = 0; i < selectedCategories.length; i++) {
      if (selectedCategories[i].value === targetCategory.value) {
        targetCategoryIndex = i;
        break;
      }
    }

    const selectedCategoryListStart = selectedCategories.slice(
      0,
      targetCategoryIndex,
    );
    const selectedCategoryListEnd = selectedCategories.slice(
      targetCategoryIndex + 1,
    );

    const newSelectedCategories = [
      ...selectedCategoryListStart,
      targetCategory,
      ...selectedCategoryListEnd,
    ];
    setSelectedCategories(newSelectedCategories);
  };

  const selectAllCategories = () => {
    setSelectedCategories(CATEGORY_OPTIONS_WITH_CHECK_FLAG);
  };
  const deselectAllCategories = () => {
    setSelectedCategories(
      CATEGORY_OPTIONS_WITH_CHECK_FLAG.map(option => {
        return {
          ...option,
          isChecked: false,
        };
      }),
    );
  };

  const filteredExpensesList = React.useMemo<IExpenseEntry[]>(() => {
    const filteredExpensesByDescription = allExpenses.filter(expense => {
      return expense.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });

    const selectedCategoryFilters = selectedCategories
      .filter(category => category.isChecked)
      .map(category => {
        return category.value;
      });

    const filteredExpensesByCategories = filteredExpensesByDescription.filter(
      expense => {
        return selectedCategoryFilters.includes(expense.category);
      },
    );

    let filteredExpensesByDate = filteredExpensesByCategories;

    if (startDate) {
      filteredExpensesByDate = filteredExpensesByCategories.filter(expense => {
        const accountingDate = parse(
          expense.accounting_date,
          'uuuu-MM-dd HH:mm:ss',
          new Date(),
        );
        return (
          isEqual(accountingDate, startDate) ||
          isAfter(accountingDate, startDate)
        );
      });
    }

    if (endDate) {
      filteredExpensesByDate = filteredExpensesByDate.filter(expense => {
        const accountingDate = parse(
          expense.accounting_date,
          'uuuu-MM-dd HH:mm:ss',
          new Date(),
        );
        return (
          isEqual(accountingDate, endDate) || isBefore(accountingDate, endDate)
        );
      });
    }

    return filteredExpensesByDate;
  }, [allExpenses, searchQuery, selectedCategories, startDate, endDate]);

  const totalExpense = React.useMemo<number>(() => {
    let totalExpense = 0;
    filteredExpensesList.forEach(expense => {
      totalExpense += expense.amount;
    });
    return totalExpense;
  }, [filteredExpensesList]);

  React.useEffect(() => {
    (async () => {
      const db = await getDBConnection();
      const newAllExpenseRecords = await getAllExpenses(db);
      setAllExpenses(newAllExpenseRecords[0].rows.raw());
    })();
  }, []);

  const renderItem = React.useCallback(
    ({item}: {item: IExpenseEntry}) => {
      return (
        <DynamicExpenseItem expense={item} isCompactView={isCompactView} />
      );
    },
    [isCompactView],
  );

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {
          height:
            Dimensions.get('window').height -
            BOTTOM_TABBAR_HEIGHT -
            (StatusBar.currentHeight || 0),
        },
      ]}>
      <View style={styles.mainflexContainer}>
        <View
          style={[
            styles.searchBarContainer,
            {backgroundColor: theme.colors.primary},
          ]}>
          <Searchbar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by description"
            style={[styles.searchBar, {backgroundColor: theme.colors.surface}]}
            inputStyle={styles.searchBarInput}
          />
          <View style={styles.controlsContainer}>
            <IconButton
              icon={isCompactView ? 'arrow-expand' : 'arrow-collapse'}
              iconColor={theme.colors.inverseOnSurface}
              onPress={toggleCompactView}
            />
            <ExpenseListDateTimeFilter
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <ExpenseListFilterMenu
              selectedCategories={selectedCategories}
              handleSetSelectedCategories={handleSetSelectedCategories}
              selectAllCategoriesCallback={selectAllCategories}
              deselectAllCategoriesCallback={deselectAllCategories}
            />
          </View>
        </View>
        <FlatList
          data={filteredExpensesList}
          keyExtractor={(item, index) =>
            `stats-expense-list-${item.id}-${index}`
          }
          renderItem={renderItem}
          ListEmptyComponent={<NoResultsView message="No expenses found." />}
        />
        <TotalExpensesView total={totalExpense} />
      </View>
    </SafeAreaView>
  );
};

export default ExpenseViewPage;
