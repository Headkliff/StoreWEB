import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter as Router, Switch  } from 'react-router-dom'
import SignInForm from "./Components/pages/logIn/SignInForm"
import SignUpForm from "./Components/pages/registration/SignUpForm"
import Notfound from "./Components/pages/404/notfound"
import Navibar from './Components/NavBar/Navbar';
import User from '../src/Components/pages/user/user'

const routing = (

    <Router>
      <Navibar/>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={SignInForm} />
          <Route path="/registration" component={SignUpForm} />
          <Route path='/user' component = {User}/>
          <Route component={Notfound} />
        </Switch>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
