/**
 * Root Component
 */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var auth = require('../../server/routes/auth');
import routes from '../../server/routes';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/book', book);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use('/api/auth', auth);


import 'bootstrap/dist/css/bootstrap.css'

export default function App(props) {
  return (
    <Router>
      { routes }
    </Router>
  );

}
