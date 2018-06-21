import React from 'react';
import axios from 'axios';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import LandingPage from './LandingPage/LandingPage';
import TermsOfService from './TermsOfService/termsOfService';
import PrivacyPolicy from './PrivacyPolicy/privacyPolicy';
import Contact from './Contact/contact';
import Careers from './Careers/careers';
import PreRegister from './PreRegister/preRegister';
import Home from './Home/Home';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

import store from './store';

const HomePage = ({ component: Component, rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => 
          sessionStorage.getItem('user') != null
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login'}}
        />}
    />
  );
};

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/termsOfService" component={TermsOfService} />
    <Route path="/privacyPolicy" component={PrivacyPolicy} />
    <Route path="/contact" component={Contact} />
    <Route path="/careers" component={Careers} />
    <Route path="/preRegister" component={PreRegister} />
    <HomePage path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);