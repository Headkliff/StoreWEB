import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SignInForm from "../Components/pages/logIn/SignInForm";
import SignUpForm from "../Components/pages/registration/SignUpForm";
import Notfound from "../Components/pages/404/notfound";
import Navibar from "../Components/NavBar/Navbar";
import User from "../Components/pages/user/user";
import EditUser from "../Components/pages/user/editinfo/editUser";
import App from "../App";

const Routes = () => {
  return (
    <Router>
      <Navibar />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={SignInForm} />
        <Route path="/registration" component={SignUpForm} />
        <Route path="/user" component={User} />
        <Route path="/edituser" component={EditUser} />
        <Route path="*" component={Notfound} />
      </Switch>
    </Router>
  );
};
export default Routes;
