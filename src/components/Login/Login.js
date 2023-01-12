import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

import classes from './Login.module.css';

const validate = (obj, tag) => {
  if (tag === 'email') {
    return obj.value.includes("@");
  } else if (tag === 'password') {
    return obj.value.trim().length > 6;
  }
};

const reducerFunction = (prevState, action) => {
  switch (action.type) {
    case 'USER_EMAIL_INPUT': 
      return { value: action.value, isValid: validate(action, "email") };
    case 'INPUT_EMAIL_BLUR': 
      return { value: prevState.value, isValid: validate(prevState, "email") };
    case 'USER_PASSWORD_INPUT': 
      return { value: action.value, isValid: validate(action, "password") };
    case 'INPUT_PASSWORD_BLUR': 
      return { value: prevState.value, isValid: validate(prevState, "password") };
    default:
      return { value: '', isValid: false };
  };
};

const Login = (props) => {
  const authContext = useContext(AuthContext);

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(reducerFunction, {
    value: '',
    isValid: null
  });

  const [passwordState, dispatchPassword] = useReducer(reducerFunction, {
    value: '',
    isValid: null
  });

  // Alias assignment - stores the isValid value in the second variable
  // We want the useEffect to run ONLY when there is a change in the isValid property, not the whole object
  //! Not an object - THIS IS OBJECT DESTRUCTURING
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    // setTimeout() returns an identifier for the timer that was set
    // We can use this identifier to clear this timer with "clearTimeout()"
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

     /* 
      Cleanup function:
      This makes the trick that when we type quickly into the input fields, 
      it will call the cleanup function on every keystroke, instead of 
      checking the validity of the form every time we press a key.

      Whenever the cleanup function runs, we clear the timer that was set
      before this cleanup function ran, so that when the next side effect 
      execution is due, we are able to set a new timer.

      In short terms, we clear the last timer before we set a new one.
    */
    return () => clearTimeout(identifier);
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ 
      type: 'USER_EMAIL_INPUT',
      value: event.target.value
    });

    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ 
      type: 'USER_PASSWORD_INPUT',
      value: event.target.value
    });

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'INPUT_EMAIL_BLUR'
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: 'INPUT_PASSWORD_BLUR'
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input 
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        
        <div className={classes.actions}>
          <Button 
            type="submit" 
            className={classes.btn} 
            disabled={!formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
