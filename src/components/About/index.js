import React, { Component } from 'react';
import {Row, Container, Col, Card, CardText, CardBody, CardTitle, CardImg} from 'reactstrap';
import Maps from './maps';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: 'https://raw.githubusercontent.com/thomleclerc/Cine6863/master/47095342_309495453108473_5780356678482395136_n.jpg',
    altText: '',
    caption: 'Cinéma vue de face'
  },
  {
    src: 'https://raw.githubusercontent.com/thomleclerc/Cine6863/master/47680820_748734005492818_1808162200615911424_n.jpg',
    altText: '',
    caption: 'L\'endroit pour visionner les films'
  },
  {
    src: 'https://raw.githubusercontent.com/thomleclerc/Cine6863/master/48356403_2032938210082718_2336746024757886976_n.jpg',
    altText: '',
    caption: 'Vue des sièges de la salle de visionnement'
  }
];

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} style={{height:700, width: 900}} />
          <CarouselCaption captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    const info = () => {
      return(
            <Card>
              <CardBody>
                <CardTitle>Heure d'ouverture</CardTitle>
                <CardText>
                  <strong>Lundi : </strong> De 17h à minuit <br />
                  <strong>Mardi : </strong> De 17h à minuit <br />
                  <strong>Mercredi : </strong> De 17h à minuit <br />
                  <strong>Jeudi : </strong> Off, on s'en va au buffet <br />
                  <strong>Vendredi : </strong> De 17h à minuit <br />
                  <strong>Samedi : </strong> De 17h à minuit <br />
                  <strong>Dimanche : </strong> De 17h à minuit <br />
                </CardText> <br />
                <CardTitle>Coût</CardTitle>
                <CardText><strong>20 $ </strong>pour les adultes <br /> <strong>10 $ </strong>pour les enfants <br /><strong> Gratuit </strong>pour les enfants ce Jeudi</CardText>
              </CardBody>
            </Card>
      );
    }

    return (
      <div>
        <Container>
          <Row className="text-center">
            <Col>
              <h1>À propos de nous ...</h1>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
                >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
              </Carousel>
            </Col>   
          </Row>
          <br/>
          <Row>
              <Col sm={{size:3}}>
                {info()}
              </Col>
              <Col sm={{size:9}}>
                <Maps />
              </Col>
          </Row>
          <br />
          {buffet()}
        </Container>
      </div>
    );
  }
}

export default AboutPage;
