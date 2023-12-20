const mongoose = require('mongoose');
const path = require('path');
const busStop = require('../models/busStop'); // Update the path to the actual busStop model, now using camel case

const testStops = [
  {
    name: 'Central Library',
    code: 'CLIB',
    location: {
      type: 'Point',
      coordinates: [103.7725, 1.2966],
    },
    description: 'Main library stop in NUS.',
  },
  {
    name: 'Kent Ridge MRT',
    code: 'KRMR',
    location: {
      type: 'Point',
      coordinates: [103.7845, 1.2936],
    },
    description: 'Bus stop near Kent Ridge MRT station.',
  },
  {
    name: 'Yusof Ishak House',
    code: 'YIHK',
    location: {
      type: 'Point',
      coordinates: [103.7742, 1.2984],
    },
    description: 'Bus stop in front of Yusof Ishak House.',
  },
  {
    name: 'University Town',
    code: 'UTWN',
    location: {
      type: 'Point',
      coordinates: [103.7732, 1.3043],
    },
    description: 'Bus stop at University Town Center.',
  },
  {
    name: 'Faculty of Engineering',
    code: 'FOEN',
    location: {
      type: 'Point',
      coordinates: [103.7704, 1.3002],
    },
    description: 'Bus stop outside Faculty of Engineering.',
  },
  {
    name: 'Science Park Drive',
    code: 'SPDR',
    location: {
      type: 'Point',
      coordinates: [103.7776, 1.2915],
    },
    description: 'Bus stop at Science Park Drive, near NUS.',
  },
  {
    name: 'Business School',
    code: 'BSCH',
    location: {
      type: 'Point',
      coordinates: [103.7743, 1.2935],
    },
    description: 'Bus stop near NUS Business School.',
  },
  {
    name: 'Prince George\'s Park',
    code: 'PGPR',
    location: {
      type: 'Point',
      coordinates: [103.7802, 1.2916],
    },
    description: 'Bus stop at Prince George\'s Park Residences.',
  },
  {
    name: 'COM2 (School of Computing)',
    code: 'COM2',
    location: {
      type: 'Point',
      coordinates: [103.7736, 1.2944],
    },
    description: 'Bus stop near School of Computing, COM2 building.',
  },
  {
    name: 'Opposite Kent Ridge MRT',
    code: 'OKRM',
    location: {
      type: 'Point',
      coordinates: [103.7847, 1.2938],
    },
    description: 'Bus stop opposite Kent Ridge MRT station.',
  },
  {
    name: 'Ventus (Opp LT13)',
    code: 'VENT',
    location: {
      type: 'Point',
      coordinates: [103.7707, 1.2953],
    },
    description: 'Bus stop at Ventus, opposite Lecture Theatre 13.',
  },
  {
    name: 'Opposite University Health Center',
    code: 'OUHC',
    location: {
      type: 'Point',
      coordinates: [103.7754, 1.2981],
    },
    description: 'Bus stop opposite University Health Center.',
  },
  {
    name: 'Raffles Hall',
    code: 'RFHL',
    location: {
      type: 'Point',
      coordinates: [103.7724, 1.3001],
    },
    description: 'Bus stop near Raffles Hall.',
  },
  {
    name: 'Opposite Hon Sui Sen Memorial Library',
    code: 'OHSM',
    location: {
      type: 'Point',
      coordinates: [103.7746, 1.2926],
    },
    description: 'Bus stop opposite Hon Sui Sen Memorial Library.',
  }  
];

/**
 * Inserts test stop data into the database.
 * @returns {Promise<void>} A promise that resolves when the test data is inserted successfully.
 */
async function insertTestStopData() {
  try {
    require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
    const mongoUri = process.env.MONGODB_URI;
    console.log('Connecting to:', mongoUri); // Debugging line to check URI
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in your .env file');
    }

    await mongoose.connect(mongoUri);
    console.log('Database connection successful');

    await busStop.deleteMany({});
    await busStop.insertMany(testStops);
    console.log('Test data inserted successfully!');
  } catch (error) {
    console.error('Error inserting test data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
}

insertTestStopData();
