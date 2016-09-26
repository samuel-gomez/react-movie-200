import React from 'react';
import { Link } from 'react-router';

import SearchBar        from './SearchBar';
import * as MovieApi    from './api/MovieApi';

export default class Videotheque extends React.Component {

    static contextTypes = {
        router : React.PropTypes.object
    };

    state = {
        movies : [],
        loadingMovies : false,
        searchKey : ''
    };

    componentWillMount() {
        this.setState({
            loadingMovies: true
        });
        MovieApi.getMovieList().then(movies => this.setState({
            movies,
            loadingMovies: false
        }));
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

    onSearch(searchKey) {
        this.setState({ searchKey });
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
        const { searchKey, loadingMovies, movies } = this.state;

        const filteredMovies = movies.filter( movie => movie.title.toLowerCase().match( searchKey.toLowerCase() ) );

        const content = loadingMovies ? this.renderLoading() : filteredMovies.map( this.renderMovieListItem.bind( this ) );

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
                <SearchBar onSearch={this.onSearch.bind(this)}/>
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