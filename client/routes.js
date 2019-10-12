/**
 * @file routes.js
 * @description All client-side routes for react-router.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AuthService from './services/AuthService';

import LandingPage from './routes/LandingPage/LandingPage';

import SignUp from './routes/SignUp/SignUp';
import Login from './routes/Login/Login';

import Home from './routes/Home/Home';
import Posts from './routes/Manage/Posts';
import Transactions from './routes/Manage/Transactions';
import Settings from './routes/Settings/Settings';
import Help from './routes/Help/Help';
import Cart from './routes/Cart/Cart';

import TermsOfService from './routes/TermsOfService/termsOfService';
import PrivacyPolicy from './routes/PrivacyPolicy/privacyPolicy';
import Contact from './routes/Contact/contact';
import Careers from './routes/Careers/careers';
import About from './routes/About/About';

import ForgotPassword from './routes/ForgotPassword/ForgotPassword';
import ForgotPasswordSuccess from './routes/ForgotPassword/ForgotPasswordSuccess';
import ResetPassword from './routes/resetPassword/ResetPassword';
import SignUpSuccess from './routes/SignUpSuccess/SignUpSuccess';
import EmailConfirmed from './routes/EmailConfirmed/EmailConfirmed';

import DashboardHome from './Dashboard/Home/DashboardHome';
import Dashboard from './Dashboard/Dashboard';

import page404 from './routes/page404/page404';

const PrivateRoute = ({ component: Component, rest }) => {
  const auth = new AuthService();
  return (
    <Route
      {...rest}
      render={props => (auth.loggedIn()
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login' }} />)}
    />
  );
};

const DashboardRoute = ({ component: Component, rest }) => {
  const auth = new AuthService();
  return (
    <Route
      {...rest}
      render={props => (auth.getProfile().userInfo.permissionType === 1
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/dashboard' }} />)}
    />
  );
};

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/terms-of-service" component={TermsOfService} />
    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/careers" component={Careers} />
    <Route exact path="/About" component={About} />
    <Route path="/resetPassword/:resetToken" component={ResetPassword} />

    <PrivateRoute exact path="/home" component={Home} />
    <PrivateRoute exact path="/manage/posts" component={Posts} />
    <PrivateRoute exact path="/manage/transactions" component={Transactions} />
    <PrivateRoute exact path="/settings" component={Settings} />
    <PrivateRoute exact path="/help" component={Help} />
    <PrivateRoute exact path="/cart" component={Cart} />

    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route exact path="/forgot-password-success" component={ForgotPasswordSuccess} />
    <Route exact path="/sign-up-success" component={SignUpSuccess} />
    <Route exact path="/email-confirmed" component={EmailConfirmed} />
    <Route exact path="/dashboard" component={Dashboard} />
    <DashboardRoute exact path="/dashboard/home" component={DashboardHome} />
    <Route path="*" component={page404} />
  </Switch>
);
