import { DataSourceOptions } from 'typeorm';

export type BuildTypeOrmOptionsParams = {
  dbName: string;
  entities: DataSourceOptions['entities'];
  migrations?: DataSourceOptions['migrations'];
};

export function buildTypeOrmOptions(
  params: BuildTypeOrmOptionsParams,
): DataSourceOptions {
  const prod = process.env.NODE_ENV === 'production';

  const databaseName = process.env[params.dbName];

  if (!databaseName) {
    throw new Error(`Missing environment variable: ${params.dbName}`);
  }

  return {
    type: 'postgres',

    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,

    database: databaseName,

    maxQueryExecutionTime: 1000,
    cache: false,

    logging: prod ? ['error', 'warn', 'log'] : 'all',
    logger: 'advanced-console',

    entities: params.entities,
    migrations: params.migrations,

    migrationsTableName: 'typeorm_migrations',
    synchronize: false,
  };
}
