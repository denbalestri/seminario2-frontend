import React from 'react';
import { Switch } from 'react-router-dom';
import Professionals from '../pages/Professionals';
import RecivedWork from '../pages/RecivedWork';
import RevisedWorks from '../pages/RevisedWorks';
import NotFound from '../pages/NotFound';
import { CLIENTE } from '../constants/URIs';
import { Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Switch>
      <Route path={CLIENTE.REVISIONES_URL} component={RevisedWorks} />
      <Route path={CLIENTE.PROFESIONALES_URL} component={Professionals} />
      <Route path={CLIENTE.TRABAJOS_URL} component={RecivedWork} />
      <Route path={CLIENTE.NOTFOUND_URL} component={NotFound} />
    </Switch>
  );
};

export default Routes;
