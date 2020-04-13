'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String }
});

userSchema.methods.verifyPassword = function(password) {
    return this.password === password;
}

module.exports = mongoose.model('User', userSchema, 'users');
