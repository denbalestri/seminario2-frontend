import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.user.user);

  return (
    <Route
      {...rest}
      render={props =>
        isEmpty(user) ? (
          <Redirect to="/iniciar-sesion" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
