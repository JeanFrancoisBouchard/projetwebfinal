import React from 'react';
import { DropdownItem} from 'reactstrap';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <DropdownItem onClick={firebase.doSignOut}>
    Se déconnecter
  </DropdownItem>
);

export default withFirebase(SignOutButton);