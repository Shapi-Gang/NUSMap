// Importing required modules
const express = require('express');
const busStopController = require('../controllers/busStopController');

// Creating a new express router
const endpoint = new express.Router();

// BusStop Endpoints
endpoint.post('/busstops', busStopController.createBusStop); // Endpoint to create a new bus stop
endpoint.get('/busstops', busStopController.getBusStops); // Endpoint to get all bus stops
endpoint.get('/busstops/nearest', busStopController.findNearestBusStop); // New endpoint to find the nearest bus stop
endpoint.get('/busstops/:id', busStopController.getBusStop); // Endpoint to get a specific bus stop by ID
endpoint.patch('/busstops/:id', busStopController.updateBusStop); // Endpoint to update a specific bus stop by ID
endpoint.delete('/busstops/:id', busStopController.deleteBusStop); // Endpoint to delete a specific bus stop by ID

module.exports = endpoint;
