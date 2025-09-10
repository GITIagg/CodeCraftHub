// tests/userController.test.js
const request = require('supertest');
const mongoose = require('mongoose'); // 👈 Importa mongoose para cerrar la conexión
const app = require('../app');
const User = require('../models/user');

describe('User Controller', () => {
  beforeAll(async () => {
    await User.deleteMany(); // Limpiar la colección antes de los tests
  });

  it('should create a user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.username).toBe('testuser');
  });

  it('should return 400 for duplicate username', async () => {
    await request(app)
      .post('/api/users')
      .send({ username: 'testuser', password: 'password123' });

    const response = await request(app)
      .post('/api/users')
      .send({ username: 'testuser', password: 'newpassword' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Username already exists');
  });

  afterAll(async () => {
    await mongoose.connection.close(); // 👈 Cerrar conexión después de los tests
  });
});
