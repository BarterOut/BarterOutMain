
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import MaterialIcon from 'react-google-material-icons';
import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import logo from '../../images/BarterOutDarkLogo.png';

import './ResetPassword.css';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      badCreditials: false,
      passwordConfirm: '',
      password: '',
    };
    this.Auth = new AuthService();

    this.resetPassword = this.resetPassword.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // this.setRedirect();
    console.log(this.props.match.params.resetToken);
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // setRedirect() {
  //   if (!this.Auth.isTokenExpired(this.Auth.getToken)) {
  //     this.setState({ redirect: true });
  //   } else {
  //     this.setState({ redirect: false });
  //   }
  // }

  _handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.resetPassword();
    }
  }

  resetPassword() {
    console.log('click');
    if (!this._validateInputs()) {
      console.log(this.state.password);
      console.log(this.state.passwordConfirm);
      return;
    }
    console.log('click 2')

    FetchService.POST('/api/auth/passwordReset/', {
      password: this.state.password,
      token: this.props.match.params.resetToken,
    })
      .then(() => {
        this.setState({ badCreditials: false });
        this.setState({ redirect: true });
      }).catch(() => {
      this.setState({ badCreditials: true });
    });
  }

  _validateInputs() {

    if (this.state.passwordConfirm === '') {
      this.setState({ badCreditials: true });
      return false;
    }
    if (this.state.password === '') {
      // this.setState({ badCreditials: true });
      return false;
    }
    if (!(this.state.password === this.state.passwordConfirm)) {
      // this.setState({ badCreditials: true });
      return false;
    }
    return true;
  }

  render() {
    // if (this.state.redirect) {
    //   return (<Redirect to="/forgotPasswordSuccess" />);
    // }
    return (
      <div className="wrapper-soft-bg">
        <div className="top-section">
          <div className="part-fgp left-bar">
            <Link to="/" href="/">
              <img className="logo-nonav" src={logo} alt="logo" />
            </Link>
          </div>
          <div className="part-fgp right-bar">
            <Link to="/login" href="/login">
              <button className="button">Back to Log In</button>
            </Link>
          </div>
        </div>
        <div className="central-content-card">
          <MaterialIcon size={100} icon="lock" id="lock-icon" />
          <h2 id="header-custom">Forgot your Password?</h2>
          <h3 id="forgot-password-message">
            No worries! Enter your email and
            we will send you a password reset link:
          </h3>
          {this.state.badCreditials && <span className="input-error">Please enter an valid email.</span>}


          <input
            className="formInput"
            placeholder="New Password"
            type="password"
            name="password"
            onChange={this.onChange}
            required
          />
          <input
            className="formInput"
            placeholder="Confirm New Password"
            type="password"
            name="passwordConfirm"
            onChange={this.onChange}
            required
          />
          <div>
            <button className="button" onClick={this.resetPassword}>Reset Password</button>
          </div>
          <div>Don&apos;t have an account?</div>
          <div><Link href="/signup" to="/signup">Sign up now</Link>.</div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
