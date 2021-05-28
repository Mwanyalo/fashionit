import React, { Component, createContext } from 'react';
import { createBrowserHistory } from 'history';

import { auth, db } from '../adapters/firebase';

const AuthContext = createContext();
const history = createBrowserHistory();
class AuthProvider extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
      displayName: '',
      loading: false,
    };
  }

  isAuthenticated = () => {
    const uid = localStorage.uid;
    const displayName = localStorage.displayName;
    if (uid) {
      this.setState({ uid: uid, displayName: displayName }, () => {
        return true;
      });
    }
    return false;
  };

  register = async (email, password, fullName) => {
    try {
      const currentUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const { uid } = currentUser.user;
      this.setUserDetails(uid, email, fullName);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  setUserDetails = async (id, email, fullName) => {
    db.ref('/users/').child(id).set({
      email: email,
      fullName: fullName,
      orderHistory: {},
      address: '',
      city: '',
      county: '',
      phone: '',
    });
    localStorage.setItem('displayName', fullName);
    localStorage.setItem('uid', id);
    this.setState({ uid: id, displayName: fullName });
    history.push('/');
  };

  login = async (email, password) => {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      const { displayName, uid } = user.user;
      localStorage.setItem('displayName', displayName);
      localStorage.setItem('uid', uid);
      this.setState({ uid: uid, displayName: displayName });
      history.push('/');
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  logout = async () => {
    try {
      await auth.signOut();
      localStorage.clear('uid');
      localStorage.clear('displayName');
      history.push('/');
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          register: this.register,
          login: this.login,
          logout: this.logout,
          isAuthenticated: this.isAuthenticated,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const Consumer = AuthContext.Consumer;
export const Provider = AuthProvider;
