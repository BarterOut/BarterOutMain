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
import Home from './Home/Home';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import EditPassword from './EditPassword/EditPassword';
import Buy from './routes/Buy/Buy';
import Sell from './routes/Sell/Sell';
import Track from './routes/Track/Track';
import Settings from './routes/Settings/Settings';
import Help from './routes/Help/Help';
import Cart from './routes/Cart/Cart';
import ForgotPassword from './routes/ForgotPassword/ForgotPassword';
import ForgotPasswordSuccess from './routes/ForgotPassword/ForgotPasswordSuccess';
import SignUpSuccess from './routes/SignUpSuccess/SignUpSuccess';
import EmailConfirmed from './routes/EmailConfirmed/EmailConfirmed';


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

const BuyPage = ({ component: Component, rest }) => {
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

const SellPage = ({ component: Component, rest }) => {
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

const SettingsPage = ({ component: Component, rest }) => {
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

const TrackPage = ({ component: Component, rest }) => {
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

const HelpPage = ({ component: Component, rest }) => {
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

const CartPage = ({ component: Component, rest }) => {
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
    <Route exact path="/termsOfService" component={TermsOfService} />
    <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/careers" component={Careers} />
    <HomePage exact path="/home" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <BuyPage exact path="/buy" component={Buy} />
    <SellPage exact path="/sell" component={Sell} />
    <TrackPage exact path="/track" component={Track} />
    <SettingsPage exact path="/settings" component={Settings} />
    <HelpPage exact path="/help" component={Help} />
    <CartPage exact path="/cart" component={Cart} />
    <Route path="/editPassword" component={EditPassword} />
    <Route path="/forgotPassword" component={ForgotPassword} />
    <Route path="/forgotPasswordSuccess" component={ForgotPasswordSuccess} />
    <Route path="/signUpSuccess" component={SignUpSuccess} />
    <Route path="/emailConfirmed" component={EmailConfirmed} />
    <Route exact path="/dashboard" component={Dashboard} />
  </Switch>
);
