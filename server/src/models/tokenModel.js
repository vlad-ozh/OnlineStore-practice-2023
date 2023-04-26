const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'users'},
  token: {type: String, required: true},

});

module.exports = model('tokens', TokenSchema);
