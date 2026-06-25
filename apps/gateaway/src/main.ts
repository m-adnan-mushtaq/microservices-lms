import { NestFactory } from '@nestjs/core';
import { GateawayModule } from './gateaway.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger-setup';
import { Logger } from 'pino-nestjs';

async function bootstrap() {
  const app = await NestFactory.create(GateawayModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
    }),
  );

  app.useLogger(app.get(Logger));

  setupSwagger(app);

  app.enableShutdownHooks();
  await app.listen(process.env.port ?? 3000);
}

bootstrap();
