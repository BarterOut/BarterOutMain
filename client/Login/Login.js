import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import { connect } from 'react-redux'

import styles from './Login.css';

class Login extends Component {
  constructor(props){ 
    super(props);

    this.state = {
        emailAddress : '',
      password : '',
        loggedIn: false,
        redirectTo: '/',
      redirect : false
    };
  }

  onChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  login() {
      console.log("we are logging in")

      console.log(this.state.emailAddress)
      console.log(this.state.password)

      axios
          .post('/user/login', {
              emailAddress: this.state.emailAddress,
              password: this.state.password
          })
          .then(response => {
              console.log('login response: ')
              console.log(response)
              if (response.status === 200) {
                  // update App.js state
                  this.props.updateUser({
                      loggedIn: true,
                      emailAddress: response.data.emailAddress
                  })
                  // update the state to redirect to home
                  this.setState({
                      redirectTo: '/'
                  })
              }
          }).catch(error => {
          console.log('login error: ')
          console.log(error);

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

      </div>
    )
  }
}

export default Login;