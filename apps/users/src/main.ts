import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from 'pino-nestjs';
import { QUEUES } from '@app/common/constants';
import { Helper } from '@app/common';

async function bootstrap() {
  const port: number = parseInt(process.env.USERS_PORT ?? '3000');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    Helper.createMicroserviceOptions(QUEUES.USERS),
  );
  app.useLogger(app.get(Logger));
  console.log('users microservice is running on port', port);
  await app.listen();
}
bootstrap();
