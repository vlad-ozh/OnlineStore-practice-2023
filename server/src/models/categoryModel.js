
const { Schema, model } = require('mongoose');
const collections = require('./collections');

const CategorySchema = new Schema({
  name: { type: String, unique: true, required: true },
});

module.exports = model(
  'Category',
  CategorySchema,
  collections.categories
);
