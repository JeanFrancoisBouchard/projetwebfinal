import React from 'react';
import StarRatings from 'react-star-ratings';
import $ from 'jquery';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {AuthUserContext} from '../Session';

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


    reviewSubmission(event, username, uid) {
        if (this.state.rating === 0) {
            event.preventDefault();
        } else {
            console.log(username, uid);
            let fetchURL = `http://localhost:8080/WebServices/webresources/Review/CreateReview?movieId=${this.props.movieId}&reviewTxt=${this.state.text}&reviewRating=${this.state.rating}&userId=${uid}&userName=${username}`;
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
                <AuthUserContext.Consumer>
                    {authUser =>
                    <Button onClick={(e) => this.reviewSubmission(e, authUser.username, authUser.uid)}>Soumettre critique.</Button>
                    }
                </AuthUserContext.Consumer>
            </form>
        );
    }
}

export default ReviewWriter;