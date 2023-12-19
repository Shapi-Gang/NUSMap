const BusStop = require('../models/busStop');

// Create a BusStop
exports.createBusStop = async (req, res) => {
  try {
    const busStop = new BusStop(req.body);
    await busStop.save();
    console.log('BusStop created:', busStop);
    res.status(201).send(busStop);
  } catch (error) {
    console.error('Error creating BusStop:', error);
    res.status(400).send(error);
  }
};

// Get all BusStops
exports.getBusStops = async (req, res) => {
  try {
    console.log('Fetching all bus stops...');
    const busStops = await BusStop.find({});
    console.log(`Found ${busStops.length} bus stops`);
    res.status(200).send(busStops);
  } catch (error) {
    console.error('Error fetching bus stops:', error);
    res.status(500).send(error);
  }
};

// Get a single BusStop by ID
exports.getBusStop = async (req, res) => {
  try {
    const busStop = await BusStop.findById(req.params.id);
    if (!busStop) {
      return res.status(404).send();
    }
    console.log('BusStop found:', busStop);
    res.status(200).send(busStop);
  } catch (error) {
    console.error('Error fetching BusStop:', error);
    res.status(500).send(error);
  }
};

// Update a BusStop
exports.updateBusStop = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'code', 'location', 'description'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const busStop = await BusStop.findById(req.params.id);
    if (!busStop) {
      return res.status(404).send();
    }

    updates.forEach((update) => (busStop[update] = req.body[update]));
    await busStop.save();

    console.log('BusStop updated:', busStop);
    res.status(200).send(busStop);
  } catch (error) {
    console.error('Error updating BusStop:', error);
    res.status(400).send(error);
  }
};

// Delete a BusStop
exports.deleteBusStop = async (req, res) => {
  try {
    const busStop = await BusStop.findByIdAndDelete(req.params.id);
    if (!busStop) {
      return res.status(404).send();
    }
    console.log('BusStop deleted:', busStop);
    res.status(200).send(busStop);
  } catch (error) {
    console.error('Error deleting BusStop:', error);
    res.status(500).send(error);
  }
};

// In busStopController.js

exports.findNearestBusStop = async (req, res) => {
  // Extract user location from query parameters
  const userLatitude = parseFloat(req.query.latitude);
  const userLongitude = parseFloat(req.query.longitude);

  if (!userLatitude || !userLongitude) {
    return res.status(400).send({ error: 'You must provide latitude and longitude.' });
  }

  try {
    // Implement the logic to find the nearest bus stop using geospatial queries
    // For example, using MongoDB's geospatial queries:
    const nearestBusStop = await BusStop.findOne({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [userLongitude, userLatitude]
          },
        },
      },
    });

    if (!nearestBusStop) {
      console.log('No nearest bus stop found');
      return res.status(404).send();
    }

    console.log('Nearest bus stop found:', nearestBusStop);
    res.status(200).send(nearestBusStop);
  } catch (error) {
    console.error('Error finding nearest bus stop:', error);
    res.status(500).send(error);
  }
};


