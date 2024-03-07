/**
 * @format
 */
//
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
//
// AppRegistry.registerComponent(appName, () => App);

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { name as appName } from './app.json';
import configureStore from "@/redux/store/configureStore";
// import { store , persistor} from "@/redux/store";

const { persistor, store } = configureStore();

const ReduxApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
