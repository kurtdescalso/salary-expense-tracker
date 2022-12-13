import * as React from 'react';
import {Appbar as PaperAppBar} from 'react-native-paper';

const AppBar = ({navigation, back}) => {
  return (
    <PaperAppBar.Header>
      {back ? <PaperAppBar.BackAction onPress={navigation.goBack} /> : null}
      <PaperAppBar.Content title="Salary Expense Tracker" />
    </PaperAppBar.Header>
  );
};

export default AppBar;
