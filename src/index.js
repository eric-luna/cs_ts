import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './movie.js';
import TV from './tv.js';
import { Router, Route, hashHistory } from 'react-router'
import { Link } from 'react-router';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Movie}/>
    <Route path="/TV" component={TV}/>
  </Router>
), document.getElementById('root')
);
