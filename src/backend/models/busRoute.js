const mongoose = require('mongoose');

const busRouteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // If you want the route name to be unique
  },
  code: {
    type: String,
    required: false // This can be optional
  },
  description: {
    type: String,
    required: false // This can be optional
  },
  stops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'busStop',
    required: true
  }],
  active: {
    type: Boolean,
    default: true // Useful if you want to enable/disable routes without deleting them
  }
  // You can add more fields as needed
});

// If you plan to search or sort by name, you might also want to index the name field
busRouteSchema.index({ name: 1 });

const BusRoute = mongoose.model('BusRoute', busRouteSchema);

module.exports = BusRoute;
