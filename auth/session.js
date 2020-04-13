const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('../config');

const store = new MongoDBStore({
  uri: config.MONGO_URI,
  collection: 'sessions'
});

const sessionMiddleware = session({
  secret: config.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store,
  resave: true,
  saveUninitialized: false
});

module.exports = sessionMiddleware;
