import { createMigrationFactory } from '@app/common';
import { entities } from '../entities';

export default createMigrationFactory({
  dbName: 'AUTH_DATABASE_NAME',
  entities: entities,
  migrations: ['apps/auth/src/migrations/*{.ts,.js}'],
});
