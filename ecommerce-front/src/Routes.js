import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
// import "bootstrap/dist/css/bootstrap.min.css";




const Routes = () => {
  return (
    <Router>
     
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />

        <PrivateRoute path="/dashboard" exact component={Dashboard} />

      </Switch>
    </Router>
  )
}

export default Routes;