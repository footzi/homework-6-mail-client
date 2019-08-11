// Реализуйте компонент формы логина.
// Используйте `/contexts/Auth` для получения метода authorize
// и статуса isAuthorized.

// Когда пользователь авторизован - перенаправьте его на роут /app

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from '../../context/Auth';
import styles from './LoginForm.module.css';

class LoginForm extends Component {
  state = { email: '', password: ''}; 

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { authorize } = this.props;
    const { email, password } = this.state;

    authorize(email, password);
  }

  render() {
    const { authError, isAuthorized } = this.props;
    const { email, password } = this.state;

    if (isAuthorized) {
      return <Redirect to="/app" />
    }

    return (
      <div className={styles.bg}>
        <form className={`${styles.form} t-form`} onSubmit={this.onSubmit}>
          <p>
            <label htmlFor="email">
              <span className={styles.labelText}>Почта</span>
            </label>
            <input type="text" name="email" className={`${styles.input} t-input-email`} onChange={this.onChange} value={email}/>
          </p>
          <p>
            <label htmlFor="password">
              <span className={styles.labelText}>Пароль</span>
            </label>
            <input type="password" name="password" className={`${styles.input} t-input-password`} onChange={this.onChange} value={password}/>
          </p>
          {authError && (
            <p className={styles.error}>{authError}</p>
          )}
          <div className={styles.buttons}>
            <button type="submit" className={`${styles.button} t-login`}>Войти</button>
          </div>
        </form>
      </div>
    )
  }
}

export default withAuth(LoginForm);