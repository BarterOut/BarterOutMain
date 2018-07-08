import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AuthService from './services/AuthService';

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
import EditProfile from './EditProfile/EditProfile';
import EditPassword from './EditPassword/EditPassword';



const HomePage = ({ component: Component, rest }) => {
  const auth = new AuthService();
  return (
    <Route
      {...rest}
      render={(props) => 
        auth.loggedIn()
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
    <Route path="/EditProfile" component={EditProfile} />
    <Route path="/EditPassword" component={EditPassword} />


  </Switch>
);
