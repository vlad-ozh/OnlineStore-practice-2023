const { Schema, model } = require('mongoose');
const collections = require('./collections');

const TokenSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: collections.users},
  token: {type: String, required: true},

});

module.exports = model('Token', TokenSchema, collections.tokens);
