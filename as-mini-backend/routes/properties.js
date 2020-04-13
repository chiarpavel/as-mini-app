'use strict';

const express = require('express');
const router = express.Router();
const Property = require('../data/models/property');

/* GET all properties. */
router.get('/', async function(req, res, next) {
    const properties = await Property.find().lean();
    res.send(properties);
});

module.exports = router;
