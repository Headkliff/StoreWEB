import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Route, Link, BrowserRouter as Router, Switch  } from 'react-router-dom'
import SignInForm from "./Components/pages/SignInForm"
import SignUpForm from "./Components/pages/SignUpForm"
import Notfound from "./Components/pages/notfound"

const routing = (
    <Router>
      <div>
        <ul>
            <Link to="/">Home</Link>|<Link to="/login">Log In</Link>|<Link to="/registration">Registration</Link>
        </ul>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={SignInForm} />
          <Route path="/registration" component={SignUpForm} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
