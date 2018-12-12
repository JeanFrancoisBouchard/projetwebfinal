import React from 'react';
import MovieList from './MovieList';
import {Col, Row, Input, Form, Button} from 'reactstrap';
import  { AuthUserContext } from '../Session';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.state= ({
      searchValue: '',
      searchInput: ''
    });
  }


  onSearchSubmit(e) { 
    const search = this.state.searchValue;
    this.setState({
      searchInput: search
    });
  }


  render() {
    return (
      <div>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 5 }}>
            <Form inline>
              <Input type="text" name="search" id="searchInputId" placeholder="Rechercher un film..." value={this.state.searchValue} onChange={evt => this.setState({searchValue: evt.target.value})}/>
              <Button color="primary" onClick={this.onSearchSubmit}>Rechercher</Button> 
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