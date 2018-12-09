import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization} from '../Session';
import { Card, Container, CardTitle, CardBody } from 'reactstrap';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
    <Container className="App">
      <Card>
        <CardTitle>
          Modifier le mot de passe de : {authUser.email}
        </CardTitle>
        <CardBody>
          <PasswordChangeForm />
        </CardBody>
      </Card>
    </Container>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);