'use strict';

const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
  id: { type: String, require: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: { type: String }, coordinates: [Number] },
  sold_price: { type: Number },
  currency: { type: String },
  images: [{ type: String }],
  type: { type: String }
});

module.exports = mongoose.model('Property', propertySchema, 'properties');
