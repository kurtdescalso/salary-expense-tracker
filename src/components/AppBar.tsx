import * as React from 'react';
import {Appbar as PaperAppBar} from 'react-native-paper';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

const AppBar = ({navigation, back}: NativeStackHeaderProps) => {
  return (
    <PaperAppBar.Header>
      {back ? <PaperAppBar.BackAction onPress={navigation.goBack} /> : null}
      <PaperAppBar.Content title="Salary Expense Tracker" />
    </PaperAppBar.Header>
  );
};

export default AppBar;
