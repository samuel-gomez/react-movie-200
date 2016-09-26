/** Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/App.css';

/** Polyfills */
import 'babel-polyfill';
import 'whatwg-fetch';

import React    from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Home from './components/Home';
import Videotheque from './components/Videotheque';
import Movie from './components/Movie';
import MovieForm from './components/MovieForm';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';


const Main = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="home" component={Home}/>
            <Route path="movies" component={Videotheque}>
                <Route path="/movie/new" component={MovieForm} />
                <Route path="/movie/:id" component={Movie} />
            </Route>
        </Route>
    </Router>
);


ReactDOM.render(Main, document.getElementById('main'));
