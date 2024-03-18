// tests/item.test.js

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

// Before running the tests, connect to the MongoDB test database
beforeAll(async () => {
  //const testMONGODB_URI = 'your-mongodb-test-connection-string';
  const testMONGODB_URI= 'mongodb://localhost:27017/Technostacks'

  await mongoose.connect(testMONGODB_URI, {  });
});

// After running the tests, close the MongoDB connection
afterAll(async () => {
  await mongoose.connection.close();
});

// Item API its just name we can take any name it similar to your project 
describe('Item API', () => {
  let createdItemId;

  it('should create a new item', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({ name: 'Test Item', description: 'Test Description', price: 19.99 });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.item).toHaveProperty('_id');
    createdItemId = response.body.item._id;
  });

  it('should get all items', async () => {
    const response = await request(app).get('/api/items');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    //expect(response.body.items).toHaveLength(1);
    //expect(response.body.items.length).toBeGreaterThanOrEqual(0);
    expect(response.body.items.length).toBeGreaterThanOrEqual(1);
expect(response.body.items.length).toBeLessThanOrEqual(10);

  });

  it('should get a specific item by ID', async () => {
    const response = await request(app).get(`/api/items/${createdItemId}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.item).toHaveProperty('_id', createdItemId);
  });

  it('should update an existing item', async () => {
    const response = await request(app)
      .put(`/api/items/${createdItemId}`)
      .send({ name: 'Updated Test Item', price: 29.99 });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.item).toHaveProperty('name', 'Updated Test Item');
    expect(response.body.item).toHaveProperty('price', 29.99);
  });

  it('should delete an item', async () => {
    const response = await request(app).delete(`/api/items/${createdItemId}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Item deleted successfully');
  });
});
