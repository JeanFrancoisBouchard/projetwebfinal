import React, { Component } from 'react';
import {Card, CardText, CardBody, CardTitle, CardImg} from 'reactstrap';
import Maps from './maps';
import {Column, Row} from 'simple-flexbox';
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

    const buffet = () => {
      return(
        <Column flexGrow={1} horizontal='center'>
          <Card>
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" /> 
            <CardBody>
              <CardTitle>Repas de ce soir</CardTitle>
              <CardText>
                <p>
                  Nous vous attendons tous ce soir au buffet des 
                  continents de Lévis au alentour de 18h30 au nom
                  de Jean-Francesca Bouchard. <br />

                  Merci et oublier pas de jeûner.
                </p>
              </CardText>
            </CardBody>
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://www.petitions24.net/uploads/images/12734280_1682125102035784_3556675732407242158_n.jpg" />
            <CardImg top width="15%" src="https://thoughtcatalog.files.wordpress.com/2018/03/a-ok.jpg?w=3232&h=2160"/>       
          </Card>
        </Column>
      );
    }

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
        <Column flexGrow={1}>
          <Row horizontal='center'>
            <h1>À propos de nous ...</h1>
          </Row>
          <Row vertical='center'>
            <Column flexGrow={1} horizontal='center'>
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
            </Column>     
          </Row>
          <Row vertical='center'>
            <Column flexGrow={1} horizontal='center'>
              {info()}
            </Column>
            <Column flexGrow={1} horizontal='center'>
              <Maps />
            </Column>
          </Row>
          <Row vertical='center'>
            {buffet()}
          </Row>
        </Column>
      </div>
    );
  }
}

export default AboutPage;