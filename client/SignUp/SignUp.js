import React, { Component } from 'react';
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            emailAddress : '',
            password : '',
            passwordConfirm : '',
            CMC : '',
            venmoUsername : '',
            redirect : false,
            message: ''
        };
    }

    onChange(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    signUp(){
        if (!(this.state.passwordConfirm == this.state.password)){
            window.alert("Please make your passwords the same");
            return;
        }
        else {
            axios.post('/api/auth/signup', {
                    emailAddress: this.state.emailAddress,
                    password: this.state.password,
                    venmoUsername: this.state.venmoUsername,
                    CMC: this.state.CMC,
                })
                .then(response => {
                    console.log(response)
                    if (!response.data.errmsg) {
                        console.log('You have been signed up');
                        this.setState({redirect: true})
                    } else {
                        console.log('duplicate')
                    }
                }).catch(error=> {
                    console.log('Sign up server error: ')
                    console.log(error);
                })
        }
        //     let data = new FormData();
        //     let token;
        //     data.append( 'json', JSON.stringify( payload ) );
        //     fetch('/api/auth/signUp',
        //         {
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json'
        //             },
        //             method: 'POST',
        //             body: JSON.stringify({email: this.state.email, password: this.state.password, passwordConfirm: this.state.passwordConfirm})
        //         })
        //         .then(res => res.json()).then(data=>{
        
        //             // datas = res.json();
        //             localStorage.setItem('jwtToken', data.token)
        //             // return res.json()
        // })
        //         .catch((error) => {
        //             if(error.response.status === 401) {
        //                 this.setState({ message: 'Login failed. Username or password not match' });
        //             }
        //         });
        }

  render() {
    if (this.state.redirect) {
        return(<Redirect to={'/login'} />);
    }
    return (
      <div>
        <h1>Sign up for BarterOut</h1>
        <input className="inputsForSignUp" placeholder="Email" type="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$" onChange={this.onChange.bind(this)} name="emailAddress" required />
        <input className="inputsForSignUp" placeholder="Venmo Username" type="text" onChange={this.onChange.bind(this)} name="venmoUsername" required />
        <input className="inputsForSignUp" placeholder="CMC Box" type="text" onChange={this.onChange.bind(this)} name="CMC" required />
        <input className="inputsForSignUp" placeholder="Password" type="password" name="password" onChange={this.onChange.bind(this)} required />
        <input className="inputsForSignUp" placeholder="Confirm Password" type="password" name="passwordConfirm" onChange={this.onChange.bind(this)} required />
        <button className="button" type="submit" onClick={this.signUp.bind(this)}>SignUp</button>
        Back to <Link to="/login">Login</Link>
      </div>
    )
  }
}

export default SignUp;