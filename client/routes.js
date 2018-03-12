import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Welcome from './Welcome/Welcome';
import Mern from './Mern/Mern';
import LandingPage from './LandingPage/LandingPage';
import TermsOfService from './TermsOfService/termsOfService';
import PrivacyPolicy from './PrivacyPolicy/privacyPolicy';
import Contact from './Contact/contact'
import Careers from './Careers/careers';

import store from './store'

var state = {
  user: store.getState().user.isAuthenticated || false
}

store.subscribe(() => {
  state = store.getState();
})

const PrivateRoute = ({component: Component, rest}) => {

  return (
    <Route
      {...rest}
      render={(props) => state.user.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/TermsOfService" component={TermsOfService} />
    <Route path="/PrivacyPolicy" component={PrivacyPolicy} />
    <Route path="/Contact" component={Contact} />
    <Route path="/Careers" component={Careers} />

  </Switch>
);