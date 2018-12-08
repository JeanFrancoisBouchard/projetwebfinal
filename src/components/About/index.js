import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Map from './map';

class AboutPage extends Component {
  render() {

    return(
      <div>
        <Carousel>
          <div>
            <img src="https://www.google.ca/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwig66DLoJHfAhURmeAKHRp7BfUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.theverge.com%2F2018%2F7%2F30%2F17631766%2Ffirefox-logo-redesign-mozilla-user-feedback&psig=AOvVaw2GmvnUYIkIsWEi-bFzvMGG&ust=1544393587309100" alt="" />
            <p className="legend">Le cinéma vue de face.</p>
          </div>
          <div>
            <img src="https://www.google.ca/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwig66DLoJHfAhURmeAKHRp7BfUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.theverge.com%2F2018%2F7%2F30%2F17631766%2Ffirefox-logo-redesign-mozilla-user-feedback&psig=AOvVaw2GmvnUYIkIsWEi-bFzvMGG&ust=1544393587309100" alt="" />
            <p className="legend">Le cinéma vue de face.</p>
          </div>
          <div>
            <img src="https://www.google.ca/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwig66DLoJHfAhURmeAKHRp7BfUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.theverge.com%2F2018%2F7%2F30%2F17631766%2Ffirefox-logo-redesign-mozilla-user-feedback&psig=AOvVaw2GmvnUYIkIsWEi-bFzvMGG&ust=1544393587309100" alt="" />
            <p className="legend">Le cinéma vue de face.</p>
          </div>
        </Carousel>
        <Map />
      </div>
    );
  }
}

export default AboutPage;