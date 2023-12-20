const express = require('express');
const busRouteController = require('../controllers/busRouteController'); // Use the correct path to your busRouteController

// Create an express router
const router = new express.Router();

// BusRoute Endpoints
router.post('/busroutes', busRouteController.createBusRoute); // Endpoint to create a new bus route
router.get('/busroutes', busRouteController.getBusRoutes); // Endpoint to retrieve all bus routes
router.get('/busroutes/:id', busRouteController.getBusRoute); // Endpoint to retrieve a specific bus route by ID
router.patch('/busroutes/:id', busRouteController.updateBusRoute); // Endpoint to update a specific bus route by ID
router.delete('/busroutes/:id', busRouteController.deleteBusRoute); // Endpoint to delete a specific bus route by ID

// Export the router
module.exports = router;
