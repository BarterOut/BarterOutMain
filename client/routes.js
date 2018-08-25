import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AuthService from './services/AuthService';

import LandingPage from './LandingPage/LandingPage';

import SignUp from './routes/SignUp/SignUp';
import Login from './routes/Login/Login';

import Home from './Home/Home';
import Buy from './routes/Buy/Buy';
import Sell from './routes/Sell/Sell';
import Track from './routes/Track/Track';
import Settings from './routes/Settings/Settings';
import Help from './routes/Help/Help';
import Cart from './routes/Cart/Cart';

import TermsOfService from './routes/TermsOfService/termsOfService';
import PrivacyPolicy from './routes/PrivacyPolicy/privacyPolicy';
import Contact from './routes/Contact/contact';
import Careers from './routes/Careers/careers';

import EditPassword from './routes/EditPassword/EditPassword';
import ForgotPassword from './routes/ForgotPassword/ForgotPassword';
import ForgotPasswordSuccess from './routes/ForgotPassword/ForgotPasswordSuccess';

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
      render={(props) => 
        auth.loggedIn()
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login'}} // It was origninally login
      />}
    />
  );
};

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/termsOfService" component={TermsOfService} />
    <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/careers" component={Careers} />
    <PrivateRoute exact path="/home" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <PrivateRoute exact path="/buy" component={Buy} />
    <PrivateRoute exact path="/sell" component={Sell} />
    <PrivateRoute exact path="/track" component={Track} />
    <PrivateRoute exact path="/settings" component={Settings} />
    <PrivateRoute exact path="/help" component={Help} />
    <PrivateRoute exact path="/cart" component={Cart} />
    <Route exact path="/editPassword" component={EditPassword} />
    <Route exact path="/forgotPassword" component={ForgotPassword} />
    <Route exact path="/forgotPasswordSuccess" component={ForgotPasswordSuccess} />
    <Route exact path="/signUpSuccess" component={SignUpSuccess} />
    <Route exact path="/emailConfirmed" component={EmailConfirmed} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/dashboard/home" component={DashboardHome} />
    <Route path="*" component={page404} />
  </Switch>
);
