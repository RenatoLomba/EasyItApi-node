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

describe('Get Experts', async () => {
  await request(app).post('/experts')
    .send({
      name: 'Expert Example',
      email: 'expert@example.com',
      password: 'expertexample123',
      location: 'São Paulo',
    });

  await request(app).post('/experts')
    .send({
      name: 'Expert Example2',
      email: 'expert2@example.com',
      password: 'expert2example123',
      location: 'São Paulo',
    });

  test('Should be able to get all experts from the repository', async () => {
    const response = await request(app).get('/experts').send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test('Should be able to get all experts by existent location', async () => {
    const response = await request(app).get('/experts?location=São Paulo').send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test('Should not be able to get experts by inexistent location', async () => {
    const response = await request(app).get('/experts?location=Rio de Janeiro').send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
});
