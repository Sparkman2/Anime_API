const request = require('supertest');
const app = require('./server'); 

// Test suite for the first load screen
describe('Testing the load screen', () => {
  test('responds to GET Method for route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Hi! Come check out some anime!');
  });
});

// Test for the random anime route
describe('Testing the random anime', () => {
  test('responds to GET Method for route', async () => {
    const response = await request(app).get('/random-anime');
    expect(response.statusCode).toBe(200);
  });
});
