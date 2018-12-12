import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
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
    altText: 'Cinéma vue de face',
    caption: 'Cinéma vue de face'
  },
  {
    src: 'https://raw.githubusercontent.com/thomleclerc/Cine6863/master/47680820_748734005492818_1808162200615911424_n.jpg',
    altText: 'L\'endroit pour visionner les films',
    caption: 'L\'endroit pour visionner les films'
  },
  {
    src: 'https://raw.githubusercontent.com/thomleclerc/Cine6863/master/48356403_2032938210082718_2336746024757886976_n.jpg',
    altText: 'Vue des sièges de la salle de visionnement',
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
          <img src={item.src} alt={item.altText} style={{height: 600, width: 900}} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <div>
        <Container>
          <Row>
            <Col md={{size: "auto", offset: 1}}>
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
        </Container>      
        <br />
        <Row>
            <Col md={{size: "auto", offset: 1}}>
              <Maps />
            </Col>
        </Row>
            
        
        
      </div>
    );
  }
}

export default AboutPage;