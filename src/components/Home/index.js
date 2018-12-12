import React, { Component } from 'react';
import { withAuthorization, AuthUserContext } from '../Session';
import ReviewList from './ReviewList';

class HomePage extends Component {
  render() {
    return(
      <AuthUserContext.Consumer>
        {authUser =>
          <ReviewList userId={authUser.uid} />
        }
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);