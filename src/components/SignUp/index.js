import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email:  '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = event => {

  }

  onChange = event => {

  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
      
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Vous n'avez pas d'accompte? <Link to={ROUTES.SIGN_UP}>Enregistrement</Link>
  </p>
);

export default SignUpPage;
export { SignUpForm, SignUpLink };