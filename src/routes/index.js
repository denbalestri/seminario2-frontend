import React from 'react';
import Professionals from '../pages/Professionals';
import { CLIENTE } from '../constants/URIs';
import { Route } from 'react-router-dom';

const Routes = () => {
  return (
    <>
      <Route path={CLIENTE.PROFESIONALES_URL} component={Professionals} />
    </>
  );
};

export default Routes;
