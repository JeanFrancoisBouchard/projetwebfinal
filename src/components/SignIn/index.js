import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROLES from '../../constants/roles';
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
          <br />
          <SignInGoogle />
          <br />
          <SignInFacebook />
          <br />
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

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        const roles = ROLES.USER;
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: "Connexion par réseau social",
            roles: roles,
          });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <Button type="submit">Se connecter avec google</Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: "Connexion par réseau social",
            roles: ROLES.USER,
          });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <Button type="submit">Sign In with Facebook</Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInFacebook = withRouter(withFirebase(SignInFacebookBase));
const SignInGoogle = withRouter(withFirebase(SignInGoogleBase));
const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;
export { SignInForm, SignInGoogle, SignInFacebook };