// tests/item.test.js

//mocha  

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const assert = require('assert');

// Before running the tests, connect to the MongoDB test database
before(async () => {
  const testMONGODB_URI = 'mongodb://localhost:27017/Technostacks';
  await mongoose.connect(testMONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

// After running the tests, close the MongoDB connection
after(async () => {
  await mongoose.connection.close();
});

// Item API

describe('Item API', () => {
  let createdItemId;

  it('should create a new item', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({ name: 'Test Item', description: 'Test Description', price: 19.99 });

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.success, true);
    assert.ok(response.body.item._id);
    createdItemId = response.body.item._id;
  });

  it('should get all items', async () => {
    const response = await request(app).get('/api/items');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.ok(response.body.items.length > 0);
  });

  it('should get a specific item by ID', async () => {
    const response = await request(app).get(`/api/items/${createdItemId}`);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.item._id, createdItemId);
  });

  it('should update an existing item', async () => {
    const response = await request(app)
      .put(`/api/items/${createdItemId}`)
      .send({ name: 'Updated Test Item', price: 29.99 });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.item.name, 'Updated Test Item');
    assert.strictEqual(response.body.item.price, 29.99);
  });

  it('should delete an item', async () => {
    const response = await request(app).delete(`/api/items/${createdItemId}`);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.message, 'Item deleted successfully');
  });
});
