import React from 'react';
import { Switch } from 'react-router-dom';
import Professionals from '../pages/Professionals';
import RecivedWork from '../pages/RecivedWork';
import RevisedWorks from '../pages/RevisedWorks';
import ProfessionalInfo from '../components/ProfessionalInfo';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Login from '../pages/Login';
import MainLayout from '../components/Layout';
import { CLIENTE } from '../constants/URIs';
import { Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Switch>
      <Route path={CLIENTE.LOGIN_URL} component={Login} />
      <Route path={CLIENTE.REGISTER_URL} component={Register} />
      <MainLayout>
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <Route path={CLIENTE.REVISIONES_URL} component={RevisedWorks} />
          <Route path={CLIENTE.PROFESIONALES_URL} component={Professionals} />
          <Route path={CLIENTE.TRABAJOS_URL} component={RecivedWork} />
          <Route
            path={CLIENTE.INFORMACIONPROFESIONAL_URL}
            component={ProfessionalInfo}
          />
          <Route path={CLIENTE.NOTFOUND_URL} component={NotFound} />
        </section>
      </MainLayout>
    </Switch>
  );
};

export default Routes;
