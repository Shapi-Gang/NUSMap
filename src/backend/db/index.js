const mongoose = require('mongoose');
const path = require('path');

// This function initializes the database connection
async function connectToDatabase() {
  // Set the path to the .env file
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('The MONGODB_URI environment variable is not set.');
  }

  // Use mongoose to connect to the database
  try {
    // Connect to the MongoDB server with the provided URI
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds instead of 30
    });
    console.log("Connected successfully to MongoDB!");
    
    // Return the mongoose connection
    return mongoose.connection;
  } catch (error) {
    console.error("Connection to MongoDB failed:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

// Exports the connection function instead of the client
module.exports = connectToDatabase;
