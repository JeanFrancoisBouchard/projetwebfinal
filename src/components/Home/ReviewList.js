import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ReviewList extends Component {
    constructor(props) {
        super(props);
        
        this.state = ({
            reviewList: '',
            idToUpdate: null,
            txtToUpdate: null,
            titleToUpdate: null,
            ratingToUpdate: null,
            modal: false
        })

        this.onSubmit = this.onSubmit.bind(this);
        this.changeRating = this.changeRating.bind(this);
        this.toggle = this.toggle.bind(this);
        this.populateReviews = this.populateReviews.bind(this);
    }

    toggle(reviewId, movieTitle, reviewTxt, reviewRating) {
        this.setState({
            idToUpdate: reviewId,
            titleToUpdate: movieTitle,
            txtToUpdate: reviewTxt,
            ratingToUpdate: reviewRating,
            modal: !this.state.modal
        })
    }

    onSubmit = event => {
        fetch(`http://localhost:8080/WebServices/webresources/Review/UpdateReviewById?reviewId=${this.state.idToUpdate}&reviewTxt=${this.state.txtToUpdate}&reviewRating=${this.state.ratingToUpdate}`)
        this.setState({
            modal: !this.state.modal
        })
        event.preventDefault();
        this.populateReviews(this.props.userId);
    }
    onChangeText = event => {
        this.setState({
            txtToUpdate: event.target.value
        })
    }

    changeRating(newRating) {
        this.setState({
            ratingToUpdate: newRating
        })
    }
    onDelete(reviewId) {
        fetch(`http://localhost:8080/WebServices/webresources/Review/DeleteReviewById?reviewId=${reviewId}`);
        this.populateReviews(this.props.userId);
    }

    componentWillMount() {
        this.populateReviews(this.props.userId)
    }

    async populateReviews(userId) {
        const response = await fetch(`http://localhost:8080/WebServices/webresources/Review/GetReviewByUserId?userId=${userId}`);
        let reviews = await response.json();

        const element = reviews.map((review) =>
                <tr>
                    <td className="col-md-2">{review.movieTitle}</td>
                    <td className="col-md-2"><StarRatings rating={review.reviewRating} starRatedColor="red" numberOfStars={5}starDimension="30px" starSpacing="10px"/></td>
                    <td className="col-md-6">{review.reviewTxt}</td>
                    <td className="col-md-2">
                        <Button className="mr-2" color="danger" onClick={() => this.onDelete(review.reviewId)}>
                            Supprimer
                        </Button>
                        <Button color="primary" onClick={() => this.toggle(review.reviewId, review.movieTitle, review.reviewTxt, review.reviewRating)}>
                            Modifier
                        </Button>
                    </td>
                </tr>
        )

        this.setState({
            reviewList: element
        });
    }

    render() {
        return (
            <div>
            <Table>
        <thead>
          <tr>
            <th>Film</th>
            <th>Note</th>
            <th>Critique</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.reviewList}
        </tbody>
      </Table>

      <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.state.titleToUpdate}</ModalHeader>
          <form onSubmit={this.onSubmit}>
            <ModalBody>
                    <Input type="textarea" onChange={this.onChangeText} value={this.state.txtToUpdate} />
                    <StarRatings rating={this.state.ratingToUpdate} changeRating={this.changeRating} starRatedColor="red" numberOfStars={5} starDimension="30px" starSpacing="10px"/>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" type="submit">Modifier</Button>{' '}
                <Button color="secondary" onClick={() => {this.setState({modal: !this.state.modal})}}>Annuler</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
        );
    }
}

export default ReviewList;