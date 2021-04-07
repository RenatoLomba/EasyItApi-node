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

describe('Create Expert', () => {
  test('Should be able to create a new expert', async () => {
    const response = await request(app).post('/experts')
      .send({
        name: 'Expert Example',
        email: 'expert@example.com',
        password: 'expertexample123',
        location: 'São Paulo',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('name');
  });

  test('Should not be able to create a expert with the same email', async () => {
    const response = await request(app).post('/experts')
      .send({
        name: 'Expert Example',
        email: 'expert@example.com',
        password: 'expertexample123',
        location: 'São Paulo',
      });

    expect(response.status).not.toBe(201);
  });

  test('Should not be able to create a expert with a invalid email', async () => {
    const response = await request(app).post('/experts')
      .send({
        name: 'Expert Example',
        email: 'expert#example/com',
        password: 'expertexample123',
        location: 'São Paulo',
      });

    expect(response.status).toBe(400);
  });
});
