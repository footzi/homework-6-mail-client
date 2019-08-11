import React, { Component, Fragment } from 'react';
import { withAuth } from '../../context/Auth';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  // Реализуйте приватный роут.
  // Он должен проверять статус авторизации
  // и перенаправлять пользователя на страницу логина,
  // если тот не авторизован.
  render() {
    const { isAuthorized, component, path, redirect, ...rest } = this.props;

    return (
      <Fragment>
        {isAuthorized ? (
          <Route path={path} component={component} {...rest}/>
        ) : (
          <Redirect to={redirect} />
        )}
      </Fragment>
    );
  }
}

export default withAuth(PrivateRoute);
