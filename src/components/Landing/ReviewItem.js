import React from 'react';

import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';

import StarRatings from 'react-star-ratings';


class ReviewItem extends React.Component {
    render() {
        return (
            <Card color="dark" inverse>
                <CardTitle>
                    {this.props.userName}
                </CardTitle>
                <CardSubtitle>
                    <StarRatings rating={this.props.rating} starRatedColor="yellow" numberOfStars={5}starDimension="30px" starSpacing="10px"/>
                </CardSubtitle>
                <CardBody className="text-justify">
                    {this.props.reviewText}
                </CardBody>
            </Card>
        );
    }
}

export default ReviewItem;