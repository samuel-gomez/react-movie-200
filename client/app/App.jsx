/** Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/** Polyfills */
import 'babel-polyfill';
import 'whatwg-fetch';

import React    from 'react';
import ReactDOM from 'react-dom';

import Header           from './Header';
import SearchBar        from './SearchBar';
import MovieList        from './MovieList';
import * as MovieApi    from './api/MovieApi';

export default class App extends React.Component {

    state = {
        movies  : [],
        loadingMovies : false,
        searchKey : ''
    };

    componentWillMount() {
        this.setState({
            loadingMovies : true
        });
        MovieApi.getMovieList().then(movies => {
            this.setState({
                movies,
                loadingMovies : false
            });
        });
    }

    onMovieDeletion(movieId) {
        MovieApi.removeMovie(movieId).then(() => {
            const filteredMovieList = this.state.movies.filter(movie => movie.id !== movieId);
            this.setState({
                movies : filteredMovieList
            });
        });
    }

    onSearch(searchKey) {
        this.setState({ searchKey });
    }

    render() {
        const { searchKey, movies, loadingMovies } = this.state;
        const displayedMovies = movies.filter(movie => movie.title.toLowerCase().match(searchKey.toLowerCase()));
        return (
            <div>
                <Header/>
                <SearchBar onSearch={this.onSearch.bind(this)}/>
                <MovieList
                    movies={displayedMovies}
                    loadingMovies={loadingMovies}
                    onMovieDeletion={this.onMovieDeletion.bind(this)}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('main'));
