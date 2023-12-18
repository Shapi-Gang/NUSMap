// src/backend/app.js

const express = require('express');
require('dotenv').config();
const app = express();

// Database connection
const db = require('./db/index');

// Import routes
// const someRoute = require('./routes/someRoute');

// Middlewares
app.use(express.json()); // for parsing application/json

// Use imported routes
// app.use('/api/somePath', someRoute);

// A simple route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the NUSMap API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
