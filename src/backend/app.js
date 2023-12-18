// src/backend/app.js

const express = require('express');
const connectToDatabase = require('./db/index');
const busStopEndpoints = require('./endpoints/busStopEndpoints');

const app = express();
app.use(express.json());

app.use('/api', busStopEndpoints);

app.get('/', (req, res) => {
  res.send('Welcome to the NUSMap API!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

// Connect to the database and then start the server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
});

module.exports = app; // Export for testing
