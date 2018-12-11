import React from 'react';
import StarRatings from 'react-star-ratings';

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
            alert("Vous devez entrer une note.");
            event.preventDefault();
        } else {
            const jsonData = {"text": this.state.text, "rating": this.state.rating, "movieId": this.props.movieId};
            window.location.reload();
        }
    }

    render() {
        return (
            <Form onSubmit={this.reviewSubmission}>
                <FormGroup>
                    <Label for="exampleText">Votre critique.</Label>
                    <Input type="textarea" name="text" id="exampleText" value={this.state.text} onChange={evt => this.setState({text: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                    <StarRatings rating={this.state.rating} starRatedColor="blue" changeRating={this.changeRating} numberOfStars={5} name='rating' starDimension="20px" starSpacing="2px"/>
                </FormGroup>
                <Button>Soumettre critique.</Button>
            </Form>
        );
    }
}

export default ReviewWriter;