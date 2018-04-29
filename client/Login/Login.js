import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';

import styles from './Login.css';

class Login extends Component {
  constructor(props){ 
    super(props);
    this.state = {
      emailAddress : '',
      password : '',
      redirect : false
    };
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  login() {
      axios.post('/api/auth/login', {
              emailAddress: this.state.emailAddress,
              password: this.state.password
          })
          .then(response => {
              console.log('login response: ')
              console.log(response)
              if (response.status === 200) {
                  let user = response.data;
                  sessionStorage.setItem('user', JSON.stringify(user));
                  // update the state to redirect to home
                  this.setState({redirect: true})
              }
          }).catch(error => {
            console.log(`Error Loggin in: ${error}`);
          })
  }

  render() {
    if (sessionStorage.getItem('user')) {
      return(<Redirect to={'/home'} />);
    }
    return (
      <div>
        <h1>Login to BarterOut</h1>
        <input
          className="inputForLogin"
          onChange={this.onChange.bind(this)}
          placeholder="Email" type="email"
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
          name="emailAddress"
          required />
          <input 
            className="inputForLogin"
            onChange={this.onChange.bind(this)}
            placeholder="Password"
            type="password"
            name="password"
            required />
          <button className="button" onClick={this.login.bind(this)}>Login</button>
          Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    )
  }
}

export default Login;