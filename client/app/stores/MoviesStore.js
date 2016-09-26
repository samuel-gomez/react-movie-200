import dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';
import { EventEmitter } from 'events';


const state = {
    movies : [],
    movie : {},
    searchKey : '',
    displayedMovies : []
};

class MovieStore extends EventEmitter {

    get state() { return state; }

    emitChange() {
        this.emit( 'change' );
    }

    addChangeListener(callback) {
        this.on( 'change', callback )
    }

    removeChangeListener( callback ) {
        this.removeListener( 'change', callback );
    }
}

const store = new MovieStore();

export default store;


dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.FETCH_MOVIES:
            state.movies = action.movies;
            break;
        case ActionTypes.FIND_MOVIE:
            state.movie = action.movie;
            break;
        case ActionTypes.SEARCH_MOVIES:
            state.searchKey = action.searchKey;
            break;
        case ActionTypes.ADD_MOVIE:
            state.movies.push(action.newMovie);
            break;
        default:
            return true;
    }

    state.displayedMovies = state.movies.filter( movie => movie.title.toLowerCase().match( state.searchKey.toLowerCase() ) );

    store.emitChange();

    return true;
});