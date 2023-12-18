const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' }); // Ensure this points to the correct .env file location
const busStop = require('../models/busStop'); // Update the path to the actual busStop model, now using camel case

const testData = [
  {
    name: 'Central Library',
    code: 'CLIB',
    location: {
      type: 'Point',
      coordinates: [103.7725, 1.2966],
    },
    description: 'Main library stop in NUS.',
  },
  // ... add more test bus stops as needed
];

async function insertTestData() {
  await mongoose.connect(process.env.MONGODB_URI);
  try {
    await busStop.deleteMany({}); // Clear the collection if you want to start fresh
    await busStop.insertMany(testData);
    console.log('Test data inserted successfully!');
  } catch (error) {
    console.error('Error inserting test data:', error);
  }
  mongoose.disconnect();
}

insertTestData();
