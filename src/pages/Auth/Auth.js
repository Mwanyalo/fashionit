import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Auth.scss';

import Button from '../../shared/Button/Button';

class Auth extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    isLogIn: true,
  };

  componentDidMount() {
    this.props.isAuthenticated();
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isLogIn: !prevState.isLogIn,
        fullName: '',
        email: '',
        password: '',
      };
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { email, password, fullName, isLogIn } = this.state;
    if (isLogIn) {
      this.props.login(email, password);
    } else {
      this.props.register(email, password, fullName);
    }
  };

  render() {
    const { uid } = this.props;
    const { isLogIn, password, email, fullName } = this.state;

    let authRedirect = null;
    if (uid) {
      authRedirect = <Redirect to='/' />;
    }
    let title = <h1 className='auth-title'>Log in below </h1>;
    if (!isLogIn)
      title = <h1 className='auth-title'>Create an Account below</h1>;

    return (
      <>
        <div className='auth-container'>
          {title}
          <div className='switch'>
            <Button clicked={this.switchAuthModeHandler} btnType='dark'>
              SWITCH TO {!isLogIn ? 'LOG IN' : 'REGISTER'}
            </Button>
          </div>
          {authRedirect}
          <form onSubmit={this.submitHandler}>
            {!isLogIn ? (
              <div className='form-group'>
                <label htmlFor='username'>Full Name</label>
                <input
                  className='form-input'
                  type='name'
                  name='fullName'
                  id='username'
                  minLength={3}
                  value={fullName}
                  required={true}
                  onChange={this.handleChange}
                />
              </div>
            ) : null}

            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <input
                className='form-input'
                type='email'
                name='email'
                id='email'
                value={email}
                required={true}
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                className='form-input'
                type='password'
                name='password'
                id='password'
                value={password}
                required={true}
                minLength='6'
                onChange={this.handleChange}
              />
            </div>
            <div className='switch'>
              <Button>{isLogIn ? 'LOG IN' : 'REGISTER'}</Button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Auth;
