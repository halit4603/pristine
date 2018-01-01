import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar, View } from 'react-native';
import Root from './src';
import configureStore from './src/configureStore';

const store = configureStore();

export default () => (
  <Provider store={store}>
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <StatusBar translucent backgroundColor="whitesmoke" barStyle="dark-content" />
      <Root />
    </View>
  </Provider>
);
