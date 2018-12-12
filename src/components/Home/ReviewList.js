import React, { Component } from 'react';
import { Table } from 'reactstrap';
import ReviewItem from './ReviewItem';

class ReviewList extends Component {
    constructor(props) {
        super(props);
        
        this.state = ({
            reviewList: ''
        })
        this.populateReviews = this.populateReviews.bind(this);
    }

    componentWillMount() {
        this.populateReviews(this.props.userId)
    }

    async populateReviews(userId) {
        const response = await fetch(`http://localhost:8080/WebServices/webresources/Review/GetReviewByUserId?userId=${userId}`);
        let reviews = await response.json();

        const element = reviews.map((review) =>
                <ReviewItem review={review} />
        )
        this.setState({
            reviewList: element
        });
    }

    render() {
        return (
            <Table>
        <thead>
          <tr>
            <th>Film</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.reviewList}
        </tbody>
      </Table>
        );
    }
}

export default ReviewList;