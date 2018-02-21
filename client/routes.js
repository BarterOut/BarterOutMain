import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Welcome from './Welcome/Welcome';
import Mern from './Mern/Mern';
import LandingPage from './LandingPage/LandingPage';

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
    <Route exact path="/" component={Welcome} />
    <Route path="/mern" component={Mern} />
    <Route path="/landingPage" component={LandingPage} />
  </Switch>
);