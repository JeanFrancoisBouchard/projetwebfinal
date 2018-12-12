import React from 'react';
import MovieItem from './MovieItem';

import { Row, Col, CardDeck } from 'reactstrap';

let movieList = [];
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

        movieList = [];
        if (movies.Search === undefined) {
            const noMovie = (
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

            movieList.push(noMovie);
        } else {
            const deckNo = Math.ceil(movies.Search.length / 3.0);

            for (let i = 0; i < deckNo; i++) {
                let slice;
                if ((i + 1) * 3 >= movies.Search.length) {
                    slice = movies.Search.slice(i * 3);
                } else {
                    slice = movies.Search.slice(i * 3, (i + 1) * 3);
                }

                const deck = ( 
                    <div>
                        <Row>
                            <Col md={{ size: 'auto', offset: 2 }}>
                                <CardDeck>
                                    {slice.map((movie) =>
                                        <MovieItem movieId={movie.imdbID} title={movie.Title} image={movie.Poster} type={movie.Type} year={movie.Year}/>
                                    )}
                                </CardDeck>
                            </Col>
                        </Row>
                        <br />
                    </div>
                );

                movieList.push(deck);
            }
        }


        
        this.forceUpdate();
    }
    componentWillReceiveProps(newProps) {
        let search;
        if (newProps.searchInput === "") {
            search = "Under-Siege";
        } else {
            search = newProps.searchInput;
        }
        this.request(search);
    }
    render() {
        return (
            <div>
                {movieList}
            </div>
        );
    }
}
 
 export default MovieList;