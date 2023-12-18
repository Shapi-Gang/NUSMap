const mongoose = require('mongoose');
const BusStop = require('../src/backend/models/BusStop');
const BusRoute = require('../src/backend/models/BusRoute');
const { MongoMemoryServer } = require('mongodb-memory-server');

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

describe('BusRoute Model Test', () => {
  it('should create and save a bus route successfully', async () => {
    // Create bus stops first
    const busStop1 = await new BusStop({
      name: "Central Library",
      code: "CLIB",
      location: {
        type: "Point",
        coordinates: [103.7725, 1.2966]
      },
      description: "Main library stop in NUS."
    }).save();

    const busStop2 = await new BusStop({
      name: "Computer Center",
      code: "COMCEN",
      location: {
        type: "Point",
        coordinates: [103.7740, 1.2970]
      },
      description: "Computer Center stop in NUS."
    }).save();

    // Define bus route data including stops
    const busRouteData = {
      name: "Campus Loop",
      code: "CLOOP",
      description: "Circular route around the campus.",
      stops: [busStop1._id, busStop2._id],
      active: true
    };

    const validBusRoute = new BusRoute(busRouteData);
    const savedBusRoute = await validBusRoute.save();

    // Verify the saved route
    expect(savedBusRoute._id).toBeDefined();
    expect(savedBusRoute.name).toBe(busRouteData.name);
    expect(savedBusRoute.code).toBe(busRouteData.code);
    expect(savedBusRoute.description).toBe(busRouteData.description);
    expect(savedBusRoute.stops.length).toBe(busRouteData.stops.length);
    expect(savedBusRoute.active).toBe(true);
    expect(savedBusRoute.stops).toEqual(expect.arrayContaining(busRouteData.stops));
  });

  // Additional tests can be added here
});
