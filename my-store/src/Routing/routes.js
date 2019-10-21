import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SignInForm from "../Pages/LogIn/SignInForm";
import SignUpForm from "../Pages/Registration/SignUpForm";
import Notfound from "../Pages/404/Notfound";
import Navibar from "../NavBar/Navbar";
import User from "../Pages/User/User";
import EditUser from "../Pages/User/EditInfo/EditUser";
import UserList from "../Pages/UserList/UserList"
import App from "../App";

const Routes = () => {
  return (
    <Router>
      <Navibar />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={SignInForm} />
        <Route path="/registration" component={SignUpForm} />
        <Route exact path="/user" component={User} />
        <Route path="/user/edit" component={EditUser} />
        <Route path="/user/users" component={UserList} />
        <Route path="*" component={Notfound} />
      </Switch>
    </Router>
  );
};
export default Routes;
