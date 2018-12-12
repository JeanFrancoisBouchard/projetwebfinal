import React, { Component } from 'react';
import { Button } from 'reactstrap';

class ReviewItem extends Component {
    constructor(props) {
        super(props);

        this.getMovieName = this.getMovieName.bind(this);

        this.state = {
            movieName: ''
        };
    }

    async getMovieName(movieId) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=c73b10d1&i=${movieId}&r=json`);
        const movie = await response.json();

        this.setState({
            movieName: movie.Title
        });
    }

    componentWillMount() {
        this.getMovieName(this.props.review.movieId);
    }

    render() {
        return (
            <tr>
                <td>{this.state.movieName}</td>
                <td>{this.props.review.reviewRating}</td>
                <td>{this.props.review.reviewTxt}</td>
                <td>
                    <Button key={this.props.movieId} color='danger'>Supprimer</Button>
                </td>
            </tr>
        );
    }
}

export default ReviewItem;