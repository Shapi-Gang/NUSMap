const BusStop = require('../models/busStop');

// Create a BusStop
exports.createBusStop = async (req, res) => {
  try {
    const busStop = new BusStop(req.body);
    await busStop.save();
    res.status(201).send(busStop);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all BusStops
exports.getBusStops = async (req, res) => {
  try {
    const busStops = await BusStop.find({});
    res.status(200).send(busStops);
  } catch (error) {
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
    res.status(200).send(busStop);
  } catch (error) {
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

    res.status(200).send(busStop);
  } catch (error) {
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
    res.status(200).send(busStop);
  } catch (error) {
    res.status(500).send(error);
  }
};
