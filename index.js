import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import indexReducer from './src/reducers';
import indexMiddleware from './src/middleware';
import { createStore } from 'redux';
import App from './App';

const store = createStore(indexReducer, indexMiddleware);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

const RNRedux = () => (
  <Provider store = { store }>
      <App />
  </Provider>
)


registerRootComponent(RNRedux);
