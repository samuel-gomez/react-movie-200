import dispatcher from '../Dispatcher';
import actionTypes from '../actions/ActionTypes';
import { EventEmitter } from 'events';


const state = {
    movies : [],
    movie : {}
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
        case actionTypes.FETCH_MOVIES:
            state.movies = action.movies;
            break;
        case actionTypes.FIND_MOVIE:
            state.movie = action.movie;
            break;
        default:
            return true;
    }

    store.emitChange();

    return true;
});