import { DataSource } from 'typeorm';
import {
  buildTypeOrmOptions,
  BuildTypeOrmOptionsParams,
} from './database.config';
import { config } from 'dotenv';

export function createMigrationFactory(options: BuildTypeOrmOptionsParams) {
  config();
  const dataSource = new DataSource(buildTypeOrmOptions(options));
  return dataSource;
}
