import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from 'pino-nestjs';
import { Helper } from '@app/common';
import { QUEUES } from '@app/common/constants';

async function bootstrap() {
  const port: number = parseInt(process.env.AUTH_PORT ?? '3000');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    Helper.createMicroserviceOptions(QUEUES.AUTH),
  );

  app.useLogger(app.get(Logger));

  await app.listen();

  console.log(`Auth microservice is running on port ${port}`);
}
bootstrap();
