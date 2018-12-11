import React from 'react';
import ReviewItem from './ReviewItem';
import $ from 'jquery';
import _ from 'lodash';
import StarRatings from 'react-star-ratings';


class ReviewList extends React.Component {
    constructor(props) {
        super(props);

        this.populateReviews = this.populateReviews.bind(this);

        this.state = ({
            reviewList: ''
        });
    }

    populateReviews(movieId) {
        const jsonData = {"movieId": movieId};
        let self = this;

        $.ajax({
            url: 'fetchMovieReview.jsp',
            type: 'POST',
            datatype: 'JSON',
            data: jsonData,
            success: function(data) {
                let reviews, avgRating;
                if (!_.isEmpty(data)) {
                    reviews = (
                        <ReviewItem username={data.username} reviewText={data.reviewText} rating={data.rating}/>
                    ); 
                    avgRating = (
                        <div>
                            <h3>Note moyenne :</h3>
                            <StarRatings rating={data.avgRating} starRatedColor="yellow" numberOfStars={5} name='starRating' starDimension="30px" starSpacing="10px"/>
                        </div>  
                    );
                } else {
                    reviews = (
                        <div>
                            <h3>Il n'y a pas de critiques pour ce film.</h3>
                            <h3>Soyez le premier à en écrire une !</h3>
                        </div>
                    );
                    avgRating = (
                        <h5>Aucune note.</h5>
                    );
                }

                self.setState({reviews, avgRating});
            },
            error: function() {
                let reviews;
                reviews = (
                    <div>
                        <p>
                            Il n'y a pas de critiques pour ce film.
                            Soyez le premier à en écrire une !
                        </p>
                    </div>
                );

                self.setState({
                    reviewList: reviews
                });
            }
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