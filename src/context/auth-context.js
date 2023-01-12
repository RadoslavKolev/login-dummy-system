import React, { useState, useEffect } from 'react';

// Creates a context object. It takes default context
// createContext() returns an object that will contain a component
const AuthContext = React.createContext({
  // for IDE suggestions
  isLoggedIn: false,
  onLogin: (email, password) => {},  
  onLogout: () => {},  
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect guarantees that this function will execute only when the dependencies are changed
  // It will execute when the application first loads
  useEffect(() => {
    const storedUserInformation = localStorage.getItem('isLoggedIn');

    if (storedUserInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    // localStorage is global object available in the browser
    // In setItem() we give an identifier and what do we store in the browser storage
    // 1 is for Logged In, 0 is for Logged Out
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    // AuthContext.Provider is a component that we can wrap it around other components
    // Those other components and their descendants will have access to that context
    <AuthContext.Provider 
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;