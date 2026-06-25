import { SendEmailDto } from '@app/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { EmailRetryService } from './rabbitmq/email.retry.service';
import { MESSAGES } from '@app/common/constants';

@Injectable()
export class NotificationService {
  private readonly logger: Logger = new Logger(NotificationService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly emailRetryService: EmailRetryService,
  ) {}

  async sendEmail(payload: SendEmailDto, ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const originalMessage = ctx.getMessage();

    const retryCount = originalMessage.properties.headers?.retryCount ?? 0;

    // console.log(channel, originalMessage);

    // const message = JSON.parse(originalMessage.content.toString());
    // console.log(message);

    try {
      await this.mailerService.sendMail({
        to: payload.email,
        subject: 'Welcome to AI-LMS',
        template: 'welcome',
        context: {
          name: payload.data.name,
        },
      });
      await channel.ack(originalMessage);
    } catch (error: any) {
      //manually ack the message and handle the retry logic
      channel.ack(originalMessage);
      await this.emailRetryService.retryEmail(
        {
          pattern: MESSAGES.NOTIFICATIONS.SEND_EMAIL,
          data: payload,
        },
        retryCount,
        error,
      );
    }
  }
}
