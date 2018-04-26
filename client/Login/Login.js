import React, { Component } from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './Login.css';

class Login extends Component {
  constructor(props){ 
    super(props);

    this.state = {
      email : '',
      password : '',
      redirect : false
    };
  }

  onChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  login() {
    let payload = {
        email: this.state.email,
        password: this.state.password
    };
    
    let data = new FormData();
    let token;
    data.append( 'json', JSON.stringify( payload ) );
    fetch('/api/auth/login',
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({email: this.state.email, password: this.state.password})
    })
    .then(res => {
      return res.json(); 
    })
    .then(data => {
      token = data;
      sessionStorage.setItem('user', token);
      this.setState({'redirect' : token});
    });
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
          name="email" 
          required />
          <input 
            className="inputForLogin"
            onChange={this.onChange.bind(this)}
            placeholder="Password"
            type="password"
            name="password"
            required />
          <button className="button" onClick={this.login.bind(this)}>Login</button>
        <h4>Don't have an account? <Link to="/signup">Sign Up</Link></h4>
      </div>
    )
  }
}

export default Login;