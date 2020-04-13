'use strict';

const express = require('express');
const User = require('../data/models/user');
const router = express.Router();

router.post('/login', async function(req, res, next) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !user.verifyPassword(password)) {
        res.status(401).send('Invalid credentials');
        return;
    }

    req.session.authenticated = true;
    res.send('Login successful');
});

router.post('/register', async function(req, res, next) {
    const { username, password, email } = req.body;

    if (!username || !password) {
        res.status(422).send('Username and password are required');
        return;
    }

    const exists = await User.exists({ username });
    if (exists) {
        res.status(422).send('Username already exists');
        return;
    }

    await User.create({ username, password, email });

    res.send('User created');
});

router.post('/social', function(req, res, next) {
    const { token, name } = req.body;

    if (!token) {
        res.status(422).send('Token is required');
        return;
    }

    req.session.token = token;
    req.session.name = name;
    req.session.authenticated = true;

    res.send('Authentication succesful');
});

router.post('/logout', function(req, res, next) {
    req.session.destroy();

    res.send('Logout succesful')
});

module.exports = router;
