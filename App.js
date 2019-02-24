// Basic
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Routes
import AppContainer from "./src/routes";

// Prepare store
import reducers from './src/store/reducers';
import middlewares from './src/store/middlewares';

// Init Store
const store = createStore(reducers, middlewares);

export default (App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
});
