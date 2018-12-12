import React from 'react';

import {Media} from 'reactstrap';

import StarRatings from 'react-star-ratings';


class ReviewItem extends React.Component {
    render() {
        return (
            <Media>
                <Media body>
                    <Media heading>{this.props.userName}</Media>
                    <StarRatings rating={this.props.rating} starRatedColor="yellow" numberOfStars={5}starDimension="30px" starSpacing="10px"/>
                    {this.props.reviewText}
                </Media>
            </Media>
        );
    }
}

export default ReviewItem;