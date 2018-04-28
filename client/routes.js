import React from 'react';
import axios from 'axios';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Welcome from './Welcome/Welcome';
import Mern from './Mern/Mern';
import LandingPage from './LandingPage/LandingPage';
import TermsOfService from './TermsOfService/termsOfService';
import PrivacyPolicy from './PrivacyPolicy/privacyPolicy';
import Contact from './Contact/contact';
import Careers from './Careers/careers';
import PreRegister from './PreRegister/preRegister';
import Home from './Home/Home';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';

import store from './store';

var state = {
  user: store.getState().user.isAuthenticated || false
};

store.subscribe(() => {
  state = store.getState();
});

const HomePage = ({component: Component, rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => 
          sessionStorage.getItem('user')._id != ''
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login'}}
        />}
    />
  );
};

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/TermsOfService" component={TermsOfService} />
    <Route path="/PrivacyPolicy" component={PrivacyPolicy} />
    <Route path="/Contact" component={Contact} />
    <Route path="/Careers" component={Careers} />
    <Route path="/preRegister" component={PreRegister} />
    <HomePage path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
  </Switch>
);