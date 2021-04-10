import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../main/app';
import { createLocalConnection } from '../database';

beforeAll(async () => {
  const connection = await createLocalConnection();
  await connection.runMigrations();
});

afterAll(async () => {
  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();
  await queryRunner.clearDatabase();
  await connection.close();
});

describe('Expert', () => {
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
      expect(response.body).toHaveProperty('location');
      expect(response.body).toHaveProperty('stars');
      expect(response.body.stars).toBe(0);
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
          email: 'expert@example.com',
          password: 'expertexample123',
          location: 'São Paulo',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('Get Experts', () => {
    test('Should return all experts created', async () => {
      const response = await request(app).get('/experts')
        .send();

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });

    test('Should return all experts created, should be just one', async () => {
      const response = await request(app).get('/experts')
        .send();

      expect(response.status).toBe(200);
      expect(response.body.length > 1).toBe(false);
    });

    test('Should return all experts created with the property location to be São Paulo', async () => {
      const response = await request(app).get('/experts?location=São Paulo')
        .send();

      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('location');
      expect(response.body[0].location).toBe('São Paulo');
    });
  });
});
