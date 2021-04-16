import { Connection, ConnectionOptions, createConnection } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB,
  migrations: process.env.LANGUAGE === 'typescript'
    ? ['./src/database/migrations/**.ts']
    : ['./dist/database/migrations/**.js'],
  entities: process.env.LANGUAGE === 'typescript'
    ? ['./src/database/models/**.ts']
    : ['./dist/database/models/**.js'],
  cli: {
    migrationsDir: process.env.LANGUAGE === 'typescript'
      ? './src/database/migrations'
      : './dist/database/migrations',
  },
};

const createLocalConnection = async (): Promise<Connection> => {
  const connection = await createConnection(connectionOptions);
  return connection;
};

export { createLocalConnection };
