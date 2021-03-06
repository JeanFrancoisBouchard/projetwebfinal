import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
   } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import AboutPage from '../About';
import HomePage from '../Home';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.CHANGEPW} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.ABOUT} component={AboutPage} />
      <nav className="navbar fixed-bottom navbar-light bg-faded">
            <span className="text-muted">
              <a className="navbar-brand" href="http://www.lebuffetdescontinents.com/menu">Notre sponsor principal</a>
            </span>
      </nav>
      </div>
  </Router>
);

export default withAuthentication(App);