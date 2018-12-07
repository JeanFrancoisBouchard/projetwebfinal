import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Card, CardBody,CardTitle, 
  Container, Col, Form, FormGroup, 
  Label, Input, Button, Row 
} from 'reactstrap';
const SignUpPage = () => (
  <div>
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

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
        this.setState({ INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Container className="App">
      <Card>
        <CardTitle>
          Création d'un compte
        </CardTitle>
        <CardBody>
          <Form className="Form" onSubmit={this.onSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Nom complet :</Label>
                  <Input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Entrez votre nom complet"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Adresse courriel :</Label>
                  <Input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Entrez votre adresse courriel"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Mot de passe :</Label>
                  <Input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Entrez votre mot de passe"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup> 
                  <Label>Confirmation du mot de passe :</Label>
                  <Input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Entrez votre mot de passe"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button color="primary" disabled={isInvalid} type="submit">Enregistrer</Button>
                {error && <p>{error.message}</p>}
                <br />
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Container>
    );
  }
}

const SignUpLink = () => (
  <p>
    Vous n'avez pas d'accompte? <Link to={ROUTES.SIGN_UP}>Enregistrement</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;
export { SignUpForm, SignUpLink };