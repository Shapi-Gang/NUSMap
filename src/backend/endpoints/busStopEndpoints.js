// src/backend/endpoints/busStopEndpoints.js
const express = require('express');
const busStopController = require('../controllers/busStopController');
const endpoint = new express.Router();

// BusStop Endpoints
endpoint.post('/busstops', busStopController.createBusStop);
endpoint.get('/busstops', busStopController.getBusStops);
endpoint.get('/busstops/:id', busStopController.getBusStop);
endpoint.patch('/busstops/:id', busStopController.updateBusStop);
endpoint.delete('/busstops/:id', busStopController.deleteBusStop);

module.exports = endpoint;
