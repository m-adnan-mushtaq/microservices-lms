import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule, DatabaseModule, LoggerModule } from '@app/common';
import { DATABASE_NAMES } from '@app/common/constants';
import { entities } from './entities';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule.forRoot({
      dbName: DATABASE_NAMES.USERS,
      entities: entities,
      migrations: ['apps/users/src/migrations/*{.ts,.js}'],
      serviceName: 'users',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
