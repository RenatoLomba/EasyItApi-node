import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../main/app';
import { createLocalConnection } from '../database';
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

describe('Service', () => {
  let expert: IExpertGenericType;

  describe('Create Service', () => {
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

    test('Should be able to create a new service', async () => {
      const response = await request(app).post('/services')
        .send({
          expertId: expert.id,
          name: 'Formatar PC',
          description: 'Formatação completa de hardware e instalação de SO Windows',
          code: 'A001',
          price: 80.96,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('expert_id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('code');
      expect(response.body).toHaveProperty('price');
    });

    test('Should not be able to create a new service without a name or price', async () => {
      const response = await request(app).post('/services')
        .send({
          expertId: expert.id,
          description: 'Formatação completa de hardware e instalação de SO Windows',
          code: 'A001',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('Should not be able to create a new service with a code already that already existes', async () => {
      const response = await request(app).post('/services')
        .send({
          expertId: expert.id,
          name: 'Formatar PC',
          description: 'Formatação completa de hardware e instalação de SO Windows',
          code: 'A001',
          price: 80.96,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test("Should show expert with it's services", async () => {
      const response = await request(app).get(`/experts/${expert.id}`)
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('services');
      expect(response.body.services.length).toBe(1);
    });
  });
});
