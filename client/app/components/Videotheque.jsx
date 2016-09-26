import React from 'react';
import { Link } from 'react-router';

import SearchBar        from './SearchBar';
import * as MovieApi    from '../api/MovieApi';
import MoviesStore      from '../stores/MoviesStore';
import * as MoviesActionCreator from '../actions/MoviesActionCreator';


export default class Videotheque extends React.Component {

    static contextTypes = {
        router : React.PropTypes.object
    };

    state = {
        movies : [],
        loadingMovies : false
    };

    updateMovies = () => {
        this.setState( { movies: MoviesStore.state.displayedMovies } );
    };

    componentWillMount() {
        MoviesStore.addChangeListener(this.updateMovies);
    }

    componentDidMount() {
        MoviesActionCreator.fetchMovies();
    }

    componentWillUnmount() {
        MoviesStore.removeChangeListener(this.updateMovies);
    }

    onMovieDeletion(movieId) {
        MovieApi.removeMovie(movieId).then(() => {
            const filteredMovieList = this.state.movies.filter(movie => movie.id !== movieId);
            this.setState({
                movies : filteredMovieList
            });

            this.context.router.push('/movies');
        });
    }

    addMovie(movie) {
        MovieApi.addMovie(movie).then(movie => {
            const newMovieList = this.state.movies.concat([movie]);

            this.setState({
                movies : newMovieList
            });

            this.context.router.push('/movies');
        });
    }

    onMovieModification(newData) {
        MovieApi.updateMovie(newData).then(() => {
            const newMovieList = this.state.movies.map( movie => movie.id === newData.id ? newData : movie );

            this.setState({
                movies : newMovieList
            });

            this.context.router.push('/movies');
        });
    }

    renderMovieListItem(movie) {
        return (
            <li className="list-group-item" key={movie.id}>
                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            </li>
        );
    }

    renderLoading() {
        return (
            <li>Chargement des films en cours</li>
        );
    }

    render() {
        const { loadingMovies, movies } = this.state;

        const content = loadingMovies ? this.renderLoading() : movies.map( this.renderMovieListItem.bind( this ) );

        const childrenProps = {
            onMovieFormSaved : this.addMovie.bind(this),
            onMovieDeletion : this.onMovieDeletion.bind(this),
            onMovieModification : this.onMovieModification.bind(this)
        };
        const children = this.props.children ? React.cloneElement( this.props.children, childrenProps ) : null;

        return (
            <div>
                <header className="page-header">
                    <h1>
                        Ma vidéothèque <small>{movies.length} films</small> <Link className="btn btn-success" to="/movie/new">Ajouter</Link>
                    </h1>
                </header>
                <SearchBar/>
                <ul className="col-md-4 list-group">
                    {content}
                </ul>
                <div className="col-md-8">
                    {children}
                </div>
            </div>
        );
    }
}