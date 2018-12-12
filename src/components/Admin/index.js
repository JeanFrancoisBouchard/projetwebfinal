import React, { Component } from 'react';
import * as ROLES from "../../constants/roles";
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session/';

import { Table, Row, Col, Button } from 'reactstrap';
import StarRatings from 'react-star-ratings';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.populateReviews = this.populateReviews.bind(this);

    this.state = {
      loading: false,
      users: [],
      reviewList: ''
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  onDelete(reviewId) {
    fetch(`http://localhost:8080/WebServices/webresources/Review/DeleteReviewById?reviewId=${reviewId}`);
    this.populateReviews(this.props.userId);
}

componentWillMount() {
    this.populateReviews(this.props.userId)
}

async populateReviews(userId) {
    const response = await fetch(`http://localhost:8080/WebServices/webresources/Review/All`);
    let reviews = await response.json();

    const element = reviews.map((review) =>
            <tr>
                <td>{review.movieTitle}</td>
                <td>{review.userName}</td>
                <td><StarRatings rating={review.reviewRating} starRatedColor="red" numberOfStars={5}starDimension="30px" starSpacing="10px"/></td>
                <td>{review.reviewTxt}</td>
                <td>
                    <Button color="danger" onClick={() => this.onDelete(review.reviewId)}>
                        Supprimer
                    </Button>
                </td>
            </tr>
    )
    this.setState({
        reviewList: element
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading ...</div>}
        <Row>
          <Col>
            <h1>Utilisateurs :</h1>
            <UserList users={users} />
          </Col>
          <Col>
            <h1>Critiques :</h1>
            <Table bordered>
              <tr>
                <th>Film</th>
                <th>Utilisateur</th>
                <th>Note</th>
                <th>Critique</th>
                <th>Action</th>
              </tr>
              {this.state.reviewList}
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <Table bordered>
    <tr>
      <th>ID</th>
      <th>Email</th>
      <th>Username</th>
    </tr>
    {users.map(user => (
      <tr>
        <td>{user.uid}</td>
        <td>{user.email}</td>
        <td>{user.username}</td>
      </tr>
    ))}
  </Table>
);

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default withFirebase(withAuthorization(condition)(AdminPage));