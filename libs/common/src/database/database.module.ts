import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import {
  buildTypeOrmOptions,
  BuildTypeOrmOptionsParams,
} from './database.config';

type CommonDatabaseModuleOptions = BuildTypeOrmOptionsParams & {
  serviceName: string;
};

@Module({})
export class DatabaseModule {
  static forRoot(options: CommonDatabaseModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (): DataSourceOptions => {
            return buildTypeOrmOptions({
              dbName: options.dbName,
              entities: options.entities,
              migrations: options.migrations,
            });
          },

          dataSourceFactory: async (dataSourceOptions) => {
            const dataSource = await new DataSource(
              dataSourceOptions as unknown as DataSourceOptions,
            ).initialize();

            const logger = new Logger(`${options.serviceName}-database`);

            logger.log(`connected: ${dataSource.isInitialized}`);
            logger.log(`database: ${dataSource.options.database as string}`);

            return dataSource;
          },
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
