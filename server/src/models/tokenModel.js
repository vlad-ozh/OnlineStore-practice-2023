const { Schema, model } = require('mongoose');
const collections = require('./collections');

const TokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: collections.users,
    unique: true,
    required: true,
  },
  refreshTokens: {type: [String], required: true},
  resetToken: {type: String},
});

module.exports = model('Token', TokenSchema, collections.tokens);
