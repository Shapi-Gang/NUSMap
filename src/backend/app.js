// Import required modules
const express = require('express');
const path = require('path');
const connectToDatabase = require('./db/index');
const busStopEndpoints = require('./endpoints/busStopEndpoints');

// Create an instance of Express
const app = express();
app.use(express.json());

// Mount the busStopEndpoints middleware at the '/api' path
app.use('/api', busStopEndpoints);

// Define a route handler for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the NUSMap API by Shapi Gang');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Set the port number
const PORT = process.env.PORT || 3000;

// Connect to the database and then start the server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
});

// Export the app for testing
module.exports = app;
