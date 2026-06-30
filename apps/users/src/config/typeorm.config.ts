import { createMigrationFactory } from '@app/common';
import { DATABASE_NAMES } from '@app/common/constants';
import { entities } from '../entities';

export default createMigrationFactory({
  dbName: DATABASE_NAMES.USERS,
  entities: entities,
  migrations: ['apps/users/src/migrations/*{.ts,.js}'],
});
