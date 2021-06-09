import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

/**
 * UserSignIn component - renders "Sign In" screen with form for existing users to provide their account information
 * Also renders buttons for "Sign In" and "Cancel"(returns user to default route)
 */
 export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
              <label> Email Address
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email" />
                  </label>
                <label> Password 
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />    
                  </label>            
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? Click here to <Link to="/signup">sign up!</Link>
          </p>
        </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }


  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful.' ] };
          });
          
          
        } else {
          this.props.history.push(from);
          console.log(`Sign-in successful for ${emailAddress}!`)
        }
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}
