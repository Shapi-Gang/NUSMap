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
  // GeoJSON format for storing geospatial data
  position: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    // Note that longitude comes first in a GeoJSON coordinate array, not latitude
    coordinates: {
      type: [Number],
      required: true
    }
  },
  description: String
});

// Create a geospatial index on the position field
busStopSchema.index({ position: '2dsphere' });

const BusStop = mongoose.model('BusStop', busStopSchema);

module.exports = BusStop;
