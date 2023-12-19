const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');

// This function initializes the database connection
async function connectToDatabase() {
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
  
  const uri = process.env.MONGODB_URI;
  console.log('URI:', uri); // Debug statement to print the MongoDB URI
  
  if (!uri) {
    throw new Error('The MONGODB_URI environment variable is not set.');
  }
  
  const client = new MongoClient(uri, {
    tls: true,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB!");
    return client;
  } catch (error) {
    console.error("Connection to MongoDB failed:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

// Exports the connection function instead of the client
module.exports = connectToDatabase;
