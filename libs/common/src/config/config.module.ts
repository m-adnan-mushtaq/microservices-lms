import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { join } from 'path';
import joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
      validationSchema: joi.object({
        NODE_ENV: joi.string().optional(),
        GATEWAY_PORT: joi.number(),
        AUTH_PORT: joi.number(),
        COURSES_PORT: joi.number(),
        JWT_SECRET: joi.string(),
        JWT_EXPIRES_IN: joi.string(),
        SMTP_HOST: joi.string(),
        SMTP_PORT: joi.number(),
        SMTP_FROM: joi.string(),
        RABBITMQ_URL: joi.string(),
      }),
    }),
  ],
})
export class ConfigModule {}
