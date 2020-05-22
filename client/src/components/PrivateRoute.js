import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  return (
    <Route {...rest} render={() => token ? <Component /> : <Redirect to="/"/>}/>
  );
};

export default PrivateRoute;
