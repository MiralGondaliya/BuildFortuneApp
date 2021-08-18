/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import NavigationStack from './src/navigation/NavigationStack';
import FlashMessage from 'react-native-flash-message';
import {View} from 'react-native';
import {ContainerStyles} from './src/styles/globalStyles';
import Loader, {loaderRef} from './src/components/Loader';

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

const App = props => {
  return (
    <View style={ContainerStyles.container}>
      <NavigationStack {...props} />
      <FlashMessage position="top" />
      <Loader ref={loaderRef} />
    </View>
  );
};

export default App;
