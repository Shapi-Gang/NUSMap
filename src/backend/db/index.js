const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: '../.env' }); // Corrected path
 // Make sure this path points to the location of your .env file

console.log('URI:', process.env.MONGODB_URI); // Debug statement to print the MongoDB URI

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  tls: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB!");
  } catch (error) {
    console.error("Connection to MongoDB failed:", error);
    process.exit(1); // Exit the process with an error code
  }
}

connect();

module.exports = client;
