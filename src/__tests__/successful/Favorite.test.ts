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

describe('Favorite', () => {
  test('User should be able to favorite a new expert', async () => {
    const userResponse = await request(app).post('/users')
      .send({
        name: 'Expert Example',
        email: 'expert@example.com',
        password: 'expertexample123',
        location: 'São Paulo',
      });

    expect(userResponse.status).toBe(201);
    expect(userResponse.body).toHaveProperty('id');
    expect(userResponse.body).toHaveProperty('email');
    expect(userResponse.body).toHaveProperty('name');

    const expertResponse = await request(app).post('/experts')
      .send({
        name: 'Expert Example',
        email: 'expert@example.com',
        password: 'expertexample123',
        location: 'São Paulo',
      });

    expect(expertResponse.status).toBe(201);
    expect(expertResponse.body).toHaveProperty('id');
    expect(expertResponse.body).toHaveProperty('email');
    expect(expertResponse.body).toHaveProperty('name');

    const response = await request(app).post('/favorites')
      .send({
        userId: userResponse.body.id,
        expertId: expertResponse.body.id,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('user_id');
    expect(response.body).toHaveProperty('expert_id');
  });
});
