'use strict';

function verify(req, res, next) {
    if (!req.session.authenticated) {
        res.status(401).send('Not authenticated');
        return;
    }

    next();
}

module.exports = verify;
