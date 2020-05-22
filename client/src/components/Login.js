import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = () => {
  const [loginFormValues, setLoginFormValues] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const submitLogin = e => {
    e.preventDefault();
    setIsLoading(true);
    axiosWithAuth()
      .post("/api/login", loginFormValues)
      .then(res => {
        setIsLoading(false);
        localStorage.setItem("token", res.data.payload);
        history.push("/bubbles");
      })
      .catch(err => {
        setIsLoading(false);
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
        {isLoading && <h2>Logging In...</h2>}
        <input value={loginFormValues.username} onChange={changeHandler} type="text" name="username" placeholder="Enter Username"/>
        <input value={loginFormValues.password} onChange={changeHandler} type="text" name="password" placeholder="Enter Password"/>
        <button onClick={submitLogin}>Login</button>
      </form>
    </>
  );
};

export default Login;
