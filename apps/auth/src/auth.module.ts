import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { constants, DatabaseModule, Helper, LoggerModule } from '@app/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { QUEUES } from '@app/common/constants';
import { entities } from './entities';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ClientsModule.registerAsync([
      Helper.createRABBITMQClient(constants.APPS.USERS, QUEUES.USERS),
      Helper.createRABBITMQClient(
        constants.APPS.NOTIFICATIONS,
        QUEUES.NOTIFICATIONS,
      ),
    ]),
    DatabaseModule.forRoot({
      dbName: 'AUTH_DATABASE_NAME',
      entities: entities,
      migrations: ['apps/auth/src/migrations/*{.ts,.js}'],
      serviceName: 'auth',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
