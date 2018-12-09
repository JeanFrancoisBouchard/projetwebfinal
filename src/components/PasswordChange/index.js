import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Form, Row, Col, Button,
  FormGroup, Label, Input, 
  } from 'reactstrap';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    alert("Le mot de passe à bien été changé")
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
    
      return (
            <Form className="Form" onSubmit={this.onSubmit}>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Nouveau mot de passe :</Label>
                    <Input
                      name="passwordOne"
                      value={passwordOne}
                      onChange={this.onChange}
                      type="password"
                      placeholder="Nouveau mot de passe"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Confirmation :</Label>
                    <Input
                      name="passwordTwo"
                      value={passwordTwo}
                      onChange={this.onChange}
                      type="password"
                      placeholder="Confirmez le mot de passe"
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
      );
    // return (
    //   <form onSubmit={this.onSubmit}>
    //     <input
    //       name="passwordOne"
    //       value={passwordOne}
    //       onChange={this.onChange}
    //       type="password"
    //       placeholder="Mot de passe"
    //     />
    //     <input 
    //       name="passwordTwo"
    //       value={passwordTwo}
    //       onChange={this.onChange}
    //       type="password"
    //       placeholder="Mot de passe"
    //     />
    //     <button disabled={isInvalid} type="submit">
    //       Changer mon mot de passe
    //     </button>

    //     {error && <p>{error.message}</p>}
    //   </form>
    // );
  }
}

export default withFirebase(PasswordChangeForm);