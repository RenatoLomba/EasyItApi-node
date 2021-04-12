import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../main/app';
import { createLocalConnection } from '../database';
import { IUserGenericType } from '../adapters/dtos/user/IUserGenericType';
import { IExpertGenericType } from '../adapters/dtos/expert/IExpertGenericType';
import { IServiceGenericType } from '../adapters/dtos/service/IServiceGenericType';

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

describe('Appointment', () => {
  let user: IUserGenericType;
  let expert: IExpertGenericType;
  let service: IServiceGenericType;

  describe('Create Appointment', () => {
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

    test('Should be able to create a new service', async () => {
      const serviceResponse = await request(app).post('/services')
        .send({
          expertId: expert.id,
          name: 'Formatar PC',
          description: 'Formatação completa de hardware e instalação de SO Windows',
          code: 'A001',
          price: 80.96,
        });

      service = {
        id: serviceResponse.body.id,
        name: serviceResponse.body.name,
        price: serviceResponse.body.price,
        code: serviceResponse.body.code,
        description: serviceResponse.body.description,
        expert_id: serviceResponse.body.expert_id,
      };

      expect(serviceResponse.status).toBe(201);
      expect(serviceResponse.body).toHaveProperty('id');
      expect(serviceResponse.body).toHaveProperty('expert_id');
      expect(serviceResponse.body).toHaveProperty('name');
      expect(serviceResponse.body).toHaveProperty('description');
      expect(serviceResponse.body).toHaveProperty('code');
      expect(serviceResponse.body).toHaveProperty('price');
    });

    test('User should be able to create a new appointment', async () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);

      const response = await request(app).post('/appointments')
        .send({
          expertId: expert.id,
          userId: user.id,
          serviceId: service.id,
          date: date.toUTCString(),
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('expert_id');
      expect(response.body).toHaveProperty('user_id');
      expect(response.body).toHaveProperty('service_id');
      expect(response.body).toHaveProperty('date');
      expect(response.body).not.toHaveProperty('created_at');
      expect(response.body).not.toHaveProperty('updated_at');
    });

    test('User should not be able to create a new appointment on the same service with the same Expert',
      async () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);

        const response = await request(app).post('/appointments')
          .send({
            expertId: expert.id,
            userId: user.id,
            serviceId: service.id,
            date: new Date().toUTCString(),
          });

        expect(response.status).toBe(400);
      });
  });

  test('User should not be able to create a new appointment on a day that have already passed',
    async () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);

      const response = await request(app).post('/appointments')
        .send({
          expertId: expert.id,
          userId: user.id,
          serviceId: service.id,
          date: date.toUTCString(),
        });

      expect(response.status).toBe(400);
    });
});
