import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link } from 'react-router-dom';
import './index.css';
import Calculator from './Calculator';
import RandomQuote from './RandomQuote';
import * as serviceWorker from './serviceWorker';
import Home from './Home';

//Calculator component is included in root element of index.html
//ReactDOM.render(<Calculator />, document.getElementById('root'));

//RandomQuote Component
//ReactDOM.render(<RandomQuote />, document.getElementById('root'));


ReactDOM.render(
    <BrowserRouter>
     <div>
     <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Calculator">Calculator</Link>
        </li>
        <li>
          <Link to="/RandomQuote">RandomQuote</Link>
        </li>
      </ul>
        <Route exact path="/" component={Home} />
        <Route path="/Calculator" component={Calculator} />
        <Route path="/RandomQuote" component={RandomQuote} />
        </div>
  </BrowserRouter>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
