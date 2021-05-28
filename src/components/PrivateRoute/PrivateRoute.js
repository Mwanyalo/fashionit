import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.uid !== undefined ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to='/auth' />
      )
    }
  />
);

export default PrivateRoute;
