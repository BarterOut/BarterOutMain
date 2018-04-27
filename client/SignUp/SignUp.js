import React, { Component } from 'react';
import {
  Link,
    Redirect
} from 'react-router-dom';
import { connect } from 'react-redux'

class SignUp extends Component {

    constructor(props){
        super(props);

        this.state = {
            email : '',
            password : '',
            passwordConfirm : '',
            redirect : false,
            message: ''
        };
    }

    onChange(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }
    signUp(){
        // const{ email, passowrd} = this.state;
        let payload = {
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        };
        if (!(this.state.passwordConfirm == this.state.password)){


            window.alert("Please make your passwords the same");
            return;
        }
        else {



            let data = new FormData();
            let token;
            data.append( 'json', JSON.stringify( payload ) );
            fetch('/api/auth/signUp',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({email: this.state.email, password: this.state.password, passwordConfirm: this.state.passwordConfirm})
                })
                .then(res => res.json()).then(data=>{

                    // datas = res.json();
                    localStorage.setItem('jwtToken', data.token)
                    // return res.json()
        })
                .catch((error) => {
                    if(error.response.status === 401) {
                        this.setState({ message: 'Login failed. Username or password not match' });
                    }
                });


        }
    }


  render() {
    return (
      <div>
        <h1>Sign up for BarterOut</h1>
        <input className="inputsForSignUp" placeholder="Email" type="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$" onChange={this.onChange.bind(this)} name="email" required />
          <input className="inputsForSignUp" placeholder="Password" type="password" name="password" onChange={this.onChange.bind(this)} required />
          <input className="inputsForSignUp" placeholder="Confirm Password" type="password" name="passwordConfirm" onChange={this.onChange.bind(this)} required />
          <button className="button" type="submit" onClick={this.signUp.bind(this)}>SignUp</button>

      </div>
    )
  }
}

export default SignUp;