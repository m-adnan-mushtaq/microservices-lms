import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { constants, Helper, LoggerModule } from '@app/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { QUEUES } from '@app/common/constants';

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
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
