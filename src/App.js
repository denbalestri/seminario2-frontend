import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import store from './redux/store';

import history from './history';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
}
