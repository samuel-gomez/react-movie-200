/** Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/** Polyfills */
import 'babel-polyfill';
import 'whatwg-fetch';

import React    from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Home from './Home';
import Videotheque from './Videotheque';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';


const Main = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="home" component={Home}/>
            <Route path="movies" component={Videotheque}/>
        </Route>
    </Router>
);


ReactDOM.render(Main, document.getElementById('main'));
