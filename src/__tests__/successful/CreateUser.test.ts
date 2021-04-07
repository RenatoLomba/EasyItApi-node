import request from 'supertest';
import { getConnection } from 'typeorm';
import app from '../../main/app';
import createConnection from '../../database';

beforeAll(async () => {
  const connection = await createConnection();
  await connection.runMigrations();
});

afterAll(async () => {
  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();
  await queryRunner.clearDatabase();
});

describe('Create User', () => {
  test('Should be able to create a new user', async () => {
    const response = await request(app).post('/users')
      .send({
        name: 'User Example',
        email: 'user@example.com',
        password: 'userexample123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('name');
  });

  test('Should not be able to create a user with the same email', async () => {
    const response = await request(app).post('/users')
      .send({
        name: 'User Example',
        email: 'user@example.com',
        password: 'userexample123',
      });

    expect(response.status).not.toBe(201);
  });

  test('Should not be able to create a user with a invalid email', async () => {
    const response = await request(app).post('/users')
      .send({
        email: 'user#example/com',
        password: 'userexample123',
      });

    expect(response.status).toBe(400);
  });

  test('Should be able to login', async () => {
    const response = await request(app).post('/users/login')
      .send({
        email: 'user@example.com',
        password: 'userexample123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('token');
  });
});
