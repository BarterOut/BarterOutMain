import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

// all UI only routes
import SignUp from '../../routes/SignUp/SignUp';
import Login from '../../routes/Login/Login';

import Help from '../../routes/Help/Help';

import TermsOfService from '../../routes/TermsOfService/termsOfService';
import PrivacyPolicy from '../../routes/PrivacyPolicy/privacyPolicy';
import About from '../../routes/About/About';

import ForgotPassword from '../../routes/ForgotPassword/ForgotPassword';
import ForgotPasswordSuccess from '../../routes/ForgotPassword/ForgotPasswordSuccess';
import ResetPassword from '../../routes/resetPassword/ResetPassword';
import SignUpSuccess from '../../routes/SignUpSuccess/SignUpSuccess';
import EmailConfirmed from '../../routes/EmailConfirmed/EmailConfirmed';

import Dashboard from '../../Dashboard/Dashboard';

describe('UI only routes', () => {
  it('/about should render', () => {
    shallow(<About />);
  });
  it('/signup should render', () => {
    shallow(<SignUp />);
  });
  it('/login should render', () => {
    shallow(<Login />);
  });
  it('/help should render', () => {
    shallow(<Help />);
  });
  it('/terms-of-service should render', () => {
    shallow(<TermsOfService />);
  });
  it('/privacy-policy should render', () => {
    shallow(<PrivacyPolicy />);
  });
  it('/forgot-password should render', () => {
    shallow(<ForgotPassword />);
  });
  it('/forgot-password-success should render', () => {
    shallow(<ForgotPasswordSuccess />);
  });
  it('/reset-password should render', () => {
    shallow(<ResetPassword />);
  });
  it('/signup-success should render', () => {
    shallow(<SignUpSuccess />);
  });
  it('/email-confirmed should render', () => {
    shallow(<EmailConfirmed />);
  });
  it('/dashboard should render', () => {
    shallow(<Dashboard />);
  });
});