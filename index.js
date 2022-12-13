/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  MD3DarkTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {CombinedDefaultTheme, CombinedDarkTheme} from './src/styles/Theme';

export default function Main() {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
