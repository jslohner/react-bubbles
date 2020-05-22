import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [loginFormValues, setLoginFormValues] = useState({ username: "", password: "" });
  const history = useHistory();

  const submitLogin = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", loginFormValues)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        history.push("/bubbles");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const changeHandler = e => {
    setLoginFormValues({
      ...loginFormValues,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={submitLogin} className="login-form">
        <input value={loginFormValues.username} onChange={changeHandler} type="text" name="username" placeholder="Enter Username"/>
        <input value={loginFormValues.password} onChange={changeHandler} type="text" name="password" placeholder="Enter Password"/>
        <button onClick={submitLogin}>Login</button>
      </form>
    </>
  );
};

export default Login;
