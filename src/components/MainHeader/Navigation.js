import React from 'react';

import AuthContext from '../../context/auth-context';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(contextData) => {
        return (
          <nav className={classes.nav}>
            <ul>
              {contextData.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {contextData.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {contextData.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        )
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
