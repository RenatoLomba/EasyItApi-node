import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../main/app';
import { createLocalConnection } from '../database';
import { IUserGenericType } from '../adapters/dtos/user/IUserGenericType';
import { IExpertGenericType } from '../adapters/dtos/expert/IExpertGenericType';

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

describe('Favorite', () => {
  let user: IUserGenericType;
  let expert: IExpertGenericType;

  describe('Create Favorite', () => {
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

      user = {
        id: response.body.id,
        name: response.body.name,
        email: response.body.email,
      };
    });

    test('Should be able to create a new expert', async () => {
      const response = await request(app).post('/experts')
        .send({
          name: 'Expert Example',
          email: 'expert@example.com',
          password: 'expertexample123',
          location: 'São Paulo',
        });

      expert = {
        id: response.body.id,
        name: response.body.name,
        email: response.body.email,
      };

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('location');
      expect(response.body).toHaveProperty('stars');
      expect(response.body.stars).toBe(0);
    });

    test('User should be able to favorite a expert', async () => {
      const response = await request(app).post('/favorites')
        .send({
          userId: user.id,
          expertId: expert.id,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user_id');
      expect(response.body).toHaveProperty('expert_id');
      expect(response.body.user_id).toBe(user.id);
      expect(response.body.expert_id).toBe(expert.id);
    });
  });
});
