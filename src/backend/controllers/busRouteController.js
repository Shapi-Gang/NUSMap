const BusRoute = require('../models/busRoute');
// Create a new BusRoute
exports.createBusRoute = async (req, res) => {
  try {
    const newBusRoute = new BusRoute(req.body);
    await newBusRoute.save();
    res.status(201).send(newBusRoute);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Retrieve all BusRoutes
exports.getBusRoutes = async (req, res) => {
  try {
    const busRoutes = await BusRoute.find({});
    res.status(200).send(busRoutes);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Retrieve a single BusRoute by ID
exports.getBusRoute = async (req, res) => {
  try {
    const busRoute = await BusRoute.findById(req.params.id);
    if (!busRoute) {
      return res.status(404).send();
    }
    res.status(200).send(busRoute);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an existing BusRoute
exports.updateBusRoute = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'code', 'stops', 'active', 'description'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const busRoute = await BusRoute.findById(req.params.id);
    if (!busRoute) {
      return res.status(404).send();
    }

    updates.forEach((update) => busRoute[update] = req.body[update]);
    await busRoute.save();
    res.status(200).send(busRoute);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an existing BusRoute
exports.deleteBusRoute = async (req, res) => {
  try {
    const busRoute = await BusRoute.findByIdAndDelete(req.params.id);
    if (!busRoute) {
      return res.status(404).send();
    }
    res.status(200).send(busRoute);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = exports;
