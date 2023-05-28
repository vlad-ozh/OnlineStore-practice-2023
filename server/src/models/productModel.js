const { Schema, model } = require('mongoose');
const collections = require('./collections');

const ProductSchema = new Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: collections.categories },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: [String], required: true },
  salesCount: { type: Number, required: true },
  amount: { type: Number, required: true },
  reviews: {
    type: [{
      id: {type: String, unique: true, required: true},
      userId: {type: String, required: true},
      userName: {type: String, required: true},
      rating: {type: Number, required: true},
      text: {type: String, required: true},
      date: {type: String, required: true},
    }],
    required: true,
    default: [],
  },
  characteristics: {
    connection: {
      numOfSimCards: { type: String },
      simCardsFormat: { type: [String]},
      communicationStandards: { type: [String] },
    },
    screen: {
      diagonal: { type: Number },
      resolution: { type: String },
      refreshRate: { type: Number },
      pixelDensity: { type: Number },
      type: { type: String },
    },
    cpu: {
      name: { type: String },
      coresNum: { type: Number },
      gpu: { type: String },
      videoMemory: { type: Number },
    },
    memory: {
      internalMemory: { type: Number },
      type: { type: String },
      ram: { type: Number },
    },
    camera: {
      camera: { type: String },
      videoRecording: { type: String },
      opticalStabilization: { type: String },
      frontCamera: { type: String },
    },
    os: { type: String },
    wirelessTechnologies: {
      wifi: { type: String },
      gps: { type: String },
      bluetooth: { type: Number },
      nfc: { type: String },
      wirelessCharging: { type: String },
      infraredPort: { type: String },
    },
    interfacesAndConnections: { type: String },
    frame: {
      protectionStandard: { type: String },
      color: { type: String },
    },
    battery: {
      capacity: { type: Number },
      fastCharging: { type: String },
    },
    dimensions: {
      dimensions: { type: String },
      weight: { type: Number },
    },
  },
});

module.exports = model('Product', ProductSchema, collections.products);
