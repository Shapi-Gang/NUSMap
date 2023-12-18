const mongoose = require('mongoose');
const BusStop = require('../../../src/backend/models/busStop');
const { MongoMemoryServer } = require('mongodb-memory-server');

// May require additional time for downloading MongoDB binaries
jest.setTimeout(60000);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('BusStop Model Test', () => {
  it('should create and save a bus stop successfully', async () => {
    const busStopData = {
      name: "Central Library",
      code: "CLIB",
      location: { // Using 'location' as per your schema
        type: "Point", 
        coordinates: [103.7725, 1.2966] // [longitude, latitude]
      },
      description: "Main library stop in NUS."
    };

    const validBusStop = new BusStop(busStopData);
    const savedBusStop = await validBusStop.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedBusStop._id).toBeDefined();
    expect(savedBusStop.name).toBe(busStopData.name);
    expect(savedBusStop.code).toBe(busStopData.code);
    expect(savedBusStop.location.coordinates).toEqual(expect.arrayContaining(busStopData.location.coordinates));
    expect(savedBusStop.description).toBe(busStopData.description);
  });
});

describe('BusStop Geospatial Tests', () => {
    // Assuming BusStop model has a 2dsphere index on the 'location' field for geospatial queries.
    beforeAll(async () => {
      await BusStop.createIndexes(); // Make sure the geospatial index is created
    });
  
    it('should find the distance between two bus stops', async () => {
      // Create two bus stops
      const busStop1 = new BusStop({
        name: "Bus Stop 1",
        code: "BS1",
        location: { type: "Point", coordinates: [103.7700, 1.2947] },
        description: "Bus Stop 1 Description"
      });
  
      const busStop2 = new BusStop({
        name: "Bus Stop 2",
        code: "BS2",
        location: { type: "Point", coordinates: [103.7720, 1.2950] },
        description: "Bus Stop 2 Description"
      });
  
      // Save both to the database
      await busStop1.save();
      await busStop2.save();
  
      // Find the distance using MongoDB's $geoNear (or other geospatial query)
      // Assuming 'distanceField' will contain the calculated distance
      const distance = await BusStop.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: busStop1.location.coordinates },
            distanceField: "distance",
            spherical: true
          }
        },
        { $match: { _id: busStop2._id } }
      ]);
  
      // Check if distance is returned and is a number
      expect(distance).toBeDefined();
      expect(distance[0].distance).toBeGreaterThan(0);
    });
  
    it('should find the closest bus stop to a location', async () => {
        // Use a location for which to find the closest bus stop
        const userLocation = { type: "Point", coordinates: [103.7715, 1.2955] };


        // Find the closest bus stop
        const closestBusStop = await BusStop.aggregate([
            {
            $geoNear: {
                near: userLocation,
                distanceField: "distance",
                spherical: true
            }
            },
            { $limit: 1 } // Use $limit stage here
        ]);

        // Check if a bus stop is returned and is the closest
        expect(closestBusStop).toBeDefined();
        expect(closestBusStop.length).toBe(1);
        expect(closestBusStop[0].name).toBe("Bus Stop 2"); // or whichever is expected to be closest
        });
});
  
