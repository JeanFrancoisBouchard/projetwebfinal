import React from 'react';
import StarRatings from 'react-star-ratings';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';

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

            let fetchURL = `http://localhost:8080/WebServices/webresources/Review/CreateReview?movieId=${this.props.movieId}&reviewTxt=${this.state.text}&reviewRating=${this.state.rating}&userId=${uid}&userName=${username}&movieTitle=${this.props.movieTitle}`;
            fetch(fetchURL)
                .then(response => {
                    this.setState({
                        rating: 0,
                        text: ''
                    })
                });
        }
    }

    authReview(authUser) {
        return (
            <form>
                <FormGroup>
                    <Label for="exampleText">Votre critique.</Label>
                    <Input type="textarea" name="text" id="exampleText" value={this.state.text} onChange={evt => this.setState({text: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                    <StarRatings rating={this.state.rating} starRatedColor="blue" changeRating={this.changeRating} numberOfStars={5} name='rating' starDimension="20px" starSpacing="2px"/>
                </FormGroup>
                <Button onClick={(e) => this.reviewSubmission(e, authUser.username, authUser.uid)}>Soumettre critique.</Button>
            </form>
        );
    }
    
    nonAuthReview() {
        return(
            <div>
                <p>
                    Vous devez être connecté pour écrire une critique
                </p>
                <a href={ROUTES.SIGN_IN}>Se connecter</a>
            </div>    
        );
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser =>
                    authUser ? this.authReview(authUser) : this.nonAuthReview()
                }
            </AuthUserContext.Consumer>
        );
    }
}

export default ReviewWriter;