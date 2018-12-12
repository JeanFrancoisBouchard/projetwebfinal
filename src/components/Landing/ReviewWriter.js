import React from 'react';
import StarRatings from 'react-star-ratings';
import $ from 'jquery';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

class ReviewWriter extends React.Component {
    constructor(props) {
        super(props);

        this.changeRating = this.changeRating.bind(this);
        this.reviewSubmission = this.reviewSubmission.bind(this);
        this.updateText = this.updateText.bind(this);

        this.state = ({
            rating: 0,
            text: ''
        });
    }

    updateText(event) {
        console.log(event.target.value);
        this.setState = ({
            text: event.target.value
        });
    }

    changeRating(rating) {
        this.setState({rating});
    }


    reviewSubmission(event) {
        if (this.state.rating === 0) {
            event.preventDefault();
        } else {
            let fetchURL = `http://localhost:8080/WebServices/webresources/Review/CreateReview?movieId=${this.props.movieId}&reviewTxt=${this.state.text}&reviewRating=${this.state.rating}`;
            alert(fetchURL);
            fetch(fetchURL)
                .then(response => {
                    this.setState({
                        rating: 0,
                        text: ''
                    })
                });
        }
    }

    render() {
        return (
            <form>
                <FormGroup>
                    <Label for="exampleText">Votre critique.</Label>
                    <Input type="textarea" name="text" id="exampleText" value={this.state.text} onChange={evt => this.setState({text: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                    <StarRatings rating={this.state.rating} starRatedColor="blue" changeRating={this.changeRating} numberOfStars={5} name='rating' starDimension="20px" starSpacing="2px"/>
                </FormGroup>
                <Button onClick={this.reviewSubmission}>Soumettre critique.</Button>
            </form>
        );
    }
}

export default ReviewWriter;