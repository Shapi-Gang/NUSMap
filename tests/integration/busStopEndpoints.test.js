const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/backend/app');

describe('Bus Stop API Endpoints', () => {
  let newBusStopId;

  it('should list all bus stops', async () => {
    const response = await request(app).get('/api/busstops');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should create a new bus stop', async () => {
    const newBusStop = {
      name: 'New Bus Stop',
      code: 'NBS',
      location: { type: 'Point', coordinates: [10.7777, 50.2999] },
      description: 'A new bus stop near the sports complex.',
    };
    const response = await request(app).post('/api/busstops').send(newBusStop);
    newBusStopId = response.body._id; // Save the ID for later tests
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should retrieve an individual bus stop', async () => {
    const response = await request(app).get(`/api/busstops/${newBusStopId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', newBusStopId);
  });

  it('should find the nearest bus stop to a given location', async () => {
    const userLocation = { longitude: 103.2999, latitude: 10.7777 };
    const response = await request(app).get(`/api/busstops/nearest?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('location');
    expect(response.body.location.coordinates).toEqual(expect.arrayContaining([expect.any(Number)]));
  });

  it('should update an individual bus stop', async () => {
    const updatedData = {
      description: 'Updated description for the new bus stop.',
    };
    const response = await request(app)
      .patch(`/api/busstops/${newBusStopId}`)
      .send(updatedData);
    expect(response.statusCode).toBe(200);
    expect(response.body.description).toBe(updatedData.description);
  });

  it('should delete an individual bus stop', async () => {
    const response = await request(app).delete(`/api/busstops/${newBusStopId}`);
    expect(response.statusCode).toBe(200);
  });
});

afterAll(async () => {
  // If you are using an in-memory database, disconnect after tests
  await mongoose.disconnect();
  await mongoose.connection.close();
});
