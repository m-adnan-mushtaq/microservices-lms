import { Module } from '@nestjs/common';
import { GateawayController } from './gateaway.controller';
import { GateawayService } from './gateaway.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, constants, Helper, LoggerModule } from '@app/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { QUEUES } from '@app/common/constants';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ClientsModule.registerAsync([
      Helper.createRABBITMQClient(constants.APPS.USERS, QUEUES.USERS),
      Helper.createRABBITMQClient(constants.APPS.COURSES, QUEUES.COURSES),
      Helper.createRABBITMQClient(constants.APPS.AUTH, QUEUES.AUTH),
      Helper.createRABBITMQClient(
        constants.APPS.NOTIFICATIONS,
        QUEUES.NOTIFICATIONS,
      ),
    ]),
  ],
  controllers: [GateawayController, AuthController],
  providers: [GateawayService, AuthService],
})
export class GateawayModule {}
