import React from 'react';
import { Switch } from 'react-router-dom';
import Professionals from '../pages/Professionals';
import RecivedWork from '../pages/RecivedWork';
import RevisedWorks from '../pages/RevisedWorks';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Main from '../pages/Main';
import Launch from '../pages/Launch';
import Groups from '../pages/Groups';
import { CLIENTE } from '../constants/URIs';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path={CLIENTE.MENUPRINCIPAL_URL} component={Main} />
      <Route path={CLIENTE.LOGIN_URL} component={Launch} />
      <Route path={CLIENTE.REGISTER_URL} component={Register} />
      <PrivateRoute path={CLIENTE.REVISIONES_URL} component={RevisedWorks} />
      <PrivateRoute
        path={CLIENTE.PROFESIONALES_URL}
        component={Professionals}
      />
      <PrivateRoute path={CLIENTE.TRABAJOS_URL} component={RecivedWork} />
      <PrivateRoute path={CLIENTE.GRUPOS_URL} component={Groups} />
      <PrivateRoute path={CLIENTE.NOTFOUND_URL} component={NotFound} />
    </Switch>
  );
};

export default Routes;
