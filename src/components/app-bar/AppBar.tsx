import * as React from 'react';
import {Appbar as PaperAppBar, useTheme} from 'react-native-paper';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {useRoute} from '@react-navigation/native';

const AppBar = ({navigation, back}: NativeStackHeaderProps) => {
  const theme = useTheme();

  const route = useRoute();

  return (
    <PaperAppBar.Header
      style={{elevation: 0, backgroundColor: theme.colors.primary}}>
      {route.name !== 'Expense View' && back ? (
        <PaperAppBar.BackAction onPress={navigation.goBack} />
      ) : null}
      <PaperAppBar.Content title={route.name} />
    </PaperAppBar.Header>
  );
};

export default AppBar;
