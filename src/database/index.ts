import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { ENV } from '../main/environment';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? ENV.DB_TEST : ENV.DB,
  migrations: ['./src/database/migrations/**.ts'],
  entities: ['./src/database/models/**.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};

const createLocalConnection = async (): Promise<Connection> => {
  const connection = await createConnection(connectionOptions);
  return connection;
};

export { createLocalConnection };
