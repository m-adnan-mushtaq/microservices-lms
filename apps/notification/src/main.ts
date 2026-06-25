import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { Helper } from '@app/common';
import { QUEUES } from '@app/common/constants';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from 'pino-nestjs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
    Helper.createMicroserviceOptions(QUEUES.NOTIFICATIONS),
  );

  app.useLogger(app.get(Logger));

  await app.listen();

  console.log(`Notification microservice is running`);
}
bootstrap();
