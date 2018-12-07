import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes';
import { Button, Card, CardBody, CardImg, CardText, Col, Input } from 'reactstrap';
const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    
      event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name] : event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';

    return (
      <Col sm="10" md={{ size: 6, offset: 3 }}>
        <Card>
            <CardImg width="100%" alt="" src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/BBmc1w7Iiq35z51n/videoblocks-4k-animation-hexagon-shape-with-lock-icon-for-network-security-padlock-cyber-technology-concept-on-black-background_sggfoaiyf_thumbnail-small01.jpg" />
          <CardBody>
            <CardText className="text-info text-justify">
              Si votre adresse est valide, un courriel vous sera envoyé. Suivez le lien pour réinitialiser votre mot de passe.
            </CardText>
            <form onSubmit={this.onSubmit}>
              <Input 
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                type="text"
                placeholder="Adresse courriel"
              />
              <br />
              <Button  className="col-md-12" disabled={isInvalid} type="submit">
                Réinitialiser
              </Button>
              {error &&<p>{error.message}</p>}
            </form>
            <Link className="text-right" to={ROUTES.SIGN_IN}>Retourner à la page de connexion</Link>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Oublié votre mot de passe?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink};
