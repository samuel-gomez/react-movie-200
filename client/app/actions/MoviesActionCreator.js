import dispatcher from '../Dispatcher';
import actionTypes from './ActionTypes';
import * as MovieApi from '../api/MovieApi';

export function fetchMovies() {
    MovieApi.getMovieList().then(movies => {
        dispatcher.dispatch({
            actionType : actionTypes.FETCH_MOVIES,
            movies
        });
    });
}

export function findMovie(id) {
    MovieApi.getMovie(id).then(movie => {
        dispatcher.dispatch({
            actionType : actionTypes.FIND_MOVIE,
            movie
        });
    });
}

export function searchMovie(searchKey) {
    dispatcher.dispatch({
        actionType : actionTypes.SEARCH_MOVIES,
        searchKey
    });
}