import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ConfigModule, LoggerModule } from '@app/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/adapters/ejs.adapter';
import { join } from 'path';
import { EmailTopology } from './rabbitmq/email.topology';
import { EmailRetryService } from './rabbitmq/email.retry.service';

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('SMTP_HOST'),
          port: configService.get('SMTP_PORT'),
        },
        defaults: {
          from: configService.get('SMTP_FROM'),
        },
        template: {
          adapter: new EjsAdapter(),
          dir: join(__dirname, 'src', 'templates'),
        },
      }),
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, EmailTopology, EmailRetryService],
})
export class NotificationModule {}
