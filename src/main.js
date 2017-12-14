import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './component/app';

ReactDOM.render(
  (<BrowserRouter>
    <Route exact path='*' component={App} />
  </BrowserRouter>), document.getElementById('root')
);
