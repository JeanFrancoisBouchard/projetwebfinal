import React from 'react';
import MovieItem from './MovieItem';

import { Row, Col, CardDeck } from 'reactstrap';

let movieList;
let movies;

class MovieList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            element: ""
        }
    }

    request = async (search) => {
        const response = await fetch(`http://www.omdbapi.com/?apikey=c73b10d1&s=${search}&plot=full&r=json`);
        movies = await response.json();
        console.log(movies);

        console.log("before map");
        if (movies.Search === undefined) {
            movieList = (
                <div>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <h3>Il n'y a pas de film sous ce nom.</h3>
                        </Col>
                    </Row>   
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <h3>Vous êtes définitivement stupide.</h3>
                        </Col>
                    </Row>   
                </div>
            );
        } else {
            movieList = movies.Search.map((movie) => 
                <div>
                    <MovieItem imdbID={movie.imdbID} title={movie.Title} image={movie.Poster} type={movie.Type} year={movie.Year}/>
                    <br />
                </div>
            );
        }
        this.forceUpdate();
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps.searchInput);
        let search;
        if (newProps.searchInput === "") {
            search = "Under-Siege";
        } else {
            search = newProps.searchInput;
        }
        this.request(search);
    }
    render() {
        console.log("render");
        return (
            <div>
                {movieList}
            </div>
        );
    }
}
 
 export default MovieList;