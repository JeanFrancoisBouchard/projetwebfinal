import React from 'react';
import ReviewItem from './ReviewItem';
import _ from 'lodash';



class ReviewList extends React.Component {
    constructor(props) {
        super(props);

        this.populateReviews = this.populateReviews.bind(this);

        this.state = ({
            reviewList: ''
        });
    }

    async populateReviews(movieId) {
        const response = await fetch(`http://localhost:8080/WebServices/webresources/Review/GetReviewByMovieId?movieId=${movieId}`);
        let reviews = await response.json();

        const element = reviews.map((review) => 
            <div>
                <ReviewItem rating={review.reviewRating} reviewText={review.reviewTxt} userName={review.userName} />
                <hr />
            </div>
        );

        this.setState({
            reviewList: element
        });
    }

    componentWillReceiveProps(newProps) {
        this.populateReviews(newProps.movieId);
    }

    render() {
        return (
            <div>
                {this.state.reviewList}
            </div>
        );
    }
}


export default ReviewList;