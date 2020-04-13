'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth');
const propertiesRouter = require('./routes/properties');
const sessionMiddleware = require('./auth/session');
const verify = require('./auth/verify');
const { initialize, reset: resetData } = require('./data/db');

initialize()
resetData();

const app = express();

// if (process.env.NODE_ENV === 'development') {
//     const cors = require('cors');
//     app.use(cors({ origin: 'http://localhost:3010', credentials: true }));
//     app.use(express.static(path.join('..', 'as-mini-frontend', 'build')));
// }

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionMiddleware);

app.use('/api/auth', authRouter);
app.use('/api/properties', verify, propertiesRouter);
app.use('/api', (req, res, next) => { res.status(404).send('Not found'); });
app.use('*', express.static('public'));
app.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

module.exports = app;
