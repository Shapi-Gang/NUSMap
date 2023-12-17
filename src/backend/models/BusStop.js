// src/backend/models/BusStop.js
const mongoose = require('mongoose');

const busStopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  description: String
});

// This will allow you to perform geo-queries on the bus stops
busStopSchema.index({ location: '2dsphere' });

const BusStop = mongoose.model('BusStop', busStopSchema);

module.exports = BusStop;
