import { NestFactory } from '@nestjs/core';
import { CoursesModule } from './courses.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Helper } from '@app/common';
import { QUEUES } from '@app/common/constants';

async function bootstrap() {
  const port: number = parseInt(process.env.COURSES_PORT ?? '3000');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CoursesModule,
    Helper.createMicroserviceOptions(QUEUES.COURSES),
  );
  await app.listen();

  console.log(`Courses microservice is running on port ${port}`);
}

bootstrap();
