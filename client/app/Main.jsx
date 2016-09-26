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

import { Router, Route, IndexRouter, hashHistory } from 'react-router';


const Main = (
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
    </Router>
);


ReactDOM.render(Main, document.getElementById('main'));
