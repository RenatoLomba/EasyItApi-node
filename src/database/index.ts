import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import environments from '../main/environment';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: environments.DB_HOST,
  port: Number(environments.DB_PORT),
  username: environments.DB_USERNAME,
  password: environments.DB_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? environments.DB_TEST : environments.DB,
  migrations: ['./src/database/migrations/**.ts'],
  entities: ['./src/database/models/**.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};

export default async (): Promise<Connection> => {
  const connection = await createConnection(connectionOptions);
  return connection;
};
