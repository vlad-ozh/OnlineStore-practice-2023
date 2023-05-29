
const { Schema, model } = require('mongoose');
const collections = require('./collections');

const CategorySchema = new Schema({
  name: { type: String, unique: true, required: true },
  brands: { type: [String], required: true, default: [] },
});

module.exports = model(
  'Category',
  CategorySchema,
  collections.categories
);
