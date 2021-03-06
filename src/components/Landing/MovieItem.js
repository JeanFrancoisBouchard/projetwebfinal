import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, CardFooter, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import ReviewList from './ReviewList';
import ReviewWriter from './ReviewWriter';

let movieInfo = ({
    Title: "",
    Plot: ""
});

let movieRoll = 'https://www.clipartsfree.net/svg/62766-movie-roll-vector.svg';

class MovieItem extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.changeRating = this.changeRating.bind(this);

        this.state = ({
            modal: false,
            rating: 0,
        })
    }
  
    request = async (id) => {
        const response = await fetch(`http://www.omdbapi.com/?apikey=c73b10d1&i=${id}&plot=full&r=json`);
        const movie = await response.json();

        movieInfo.Title = movie.Title;
        movieInfo.Plot = movie.Plot;

        this.setState({
            modal: !this.state.modal
        });
    }

    toggle(e) {
        this.request(e.target.id);
    }

    toggleTabs(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    changeRating( newRating, name ) {
        this.setState({
            rating: newRating
        });
    }

    render() {
        return (
            <Row>
                <Col sm="6" md={{ size: 6, offset: 3 }}>
                    <Card inverse style={{ backgroundColor: '#333', borderColor: '#333', width: "350px",  height: "100%"}}>
                        <CardImg  style={{height: '300px', width: '100%'}} top width="100%" height="100%" src={this.props.image === 'N/A' ? movieRoll : this.props.image} alt="Movie poster" />
                        <CardBody>
                            <CardTitle tag="h3">{this.props.title}</CardTitle>
                            <CardSubtitle>{this.props.year}</CardSubtitle>
                            <CardText>Type: {this.props.type}</CardText>
                            <Button id={this.props.movieId} onClick={this.toggle}>Synopsis</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}> {movieInfo.Title}</ModalHeader>
                                <ModalBody className="text-justify">
                                    {movieInfo.Plot}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggle}>Retour</Button>
                                </ModalFooter>
                            </Modal>
                        </CardBody>
                        <CardFooter>
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTabs('1'); }} > Critiques </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTabs('2'); }}> Écrire votre critique </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <br />
                                <ReviewList movieId={this.props.movieId}/>
                            </TabPane>
                            <TabPane tabId="2">
                                <br />
                                <ReviewWriter  movieTitle={this.props.title} movieId={this.props.movieId}/>
                            </TabPane>
                        </TabContent>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default MovieItem;