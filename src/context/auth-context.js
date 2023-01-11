import React from 'react';

// Creates a context object. It takes default context
// createContext() returns an object that will contain a component
const AuthContext = React.createContext({
  isLoggedIn: false
});

export default AuthContext;