import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink} from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Button, Container, Col, Card, CardImg, CardBody, CardTitle, Input } from 'reactstrap';
const SignInPage = () => (
  <div>
  <Container>
    <Col sm="10" md={{ size: 8, offset: 2 }}>
      <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Logo" />
        <CardBody>
          <CardTitle>Connexion</CardTitle>
          <SignInForm />
          <PasswordForgetLink />
          <SignUpLink />
        </CardBody>
      </Card>
    </Col>
  </Container>
</div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <br />
        <Input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <br />
        <Button disabled={isInvalid} type="submit">
          Connexion
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;
export { SignInForm };