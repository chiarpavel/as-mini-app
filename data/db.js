'use strict';

const mongoose = require('mongoose');
const properties = require('./data');
const Property = require('./models/property');

function initialize() {
    mongoose
        .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .catch(error => console.error(error));
}

async function reset() {
    await Property.deleteMany();
    await Property.insertMany(properties);
}

module.exports = { initialize, reset };
