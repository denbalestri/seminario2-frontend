import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainLayout from './components/Layout';
import Routes from './routes';
import store from './redux/store';
import history from './history';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <MainLayout>
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: '100%',
            }}
          >
            <Routes />
          </section>
        </MainLayout>
      </Router>
    </Provider>
  );
}
