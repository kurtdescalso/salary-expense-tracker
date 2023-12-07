import * as React from 'react';
import {Appbar as PaperAppBar} from 'react-native-paper';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {useRoute} from '@react-navigation/native';

const AppBar = ({navigation, back}: NativeStackHeaderProps) => {
  const route = useRoute();

  return (
    <PaperAppBar.Header style={{elevation: 0}}>
      {route.name !== 'Stats' && back ? (
        <PaperAppBar.BackAction onPress={navigation.goBack} />
      ) : null}
      <PaperAppBar.Content title="Salary Expense Tracker" />
    </PaperAppBar.Header>
  );
};

export default AppBar;
