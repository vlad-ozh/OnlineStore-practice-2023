const { Schema, model } = require('mongoose');
const collections = require('./collections');

const UserSchema = new Schema({
  id: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  name: {type: String, required: true},
  password: {type: String, required: true},
  selectedProducts: {type: [String], default: []},
  cart: {type: [String], default: []},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String},
});

module.exports = model('User', UserSchema, collections.users);
