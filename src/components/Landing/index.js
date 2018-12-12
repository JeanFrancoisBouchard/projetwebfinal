import React from 'react';
import MovieList from './MovieList';
import {Col, Row, Input, Form, Button} from 'reactstrap';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state= ({
      searchInput: ''
    });
  }

  onSubmit = event => {
    this.setState({
      searchInput: event.target.elements.search.value
    });
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 5 }}>
            <Form inline onSubmit={this.onSubmit}>
              <Input 
                type="text" 
                name="search" 
                id="searchInputId" 
                placeholder="Rechercher un film..." />
              <Button type="submit" color="primary">Rechercher</Button> 
            </Form>
          </Col>
        </Row>
        <hr />
        <MovieList  searchInput={this.state.searchInput}/>
      </div>
    );
  }
} 

export default Landing;