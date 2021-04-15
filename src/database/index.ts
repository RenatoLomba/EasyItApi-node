import { Connection, ConnectionOptions, createConnection } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB,
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
