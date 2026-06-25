import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('AI LMS')
    .setDescription('AI LMS Gateway API document')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token',
      },
      'bearer',
    );

  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup('docs', app, document);
  const logger = new Logger('SwaggerModule');
  logger.log(
    `Swagger Document running on http://localhost:${process.env.GATEWAY_PORT}/docs`,
  );
}
