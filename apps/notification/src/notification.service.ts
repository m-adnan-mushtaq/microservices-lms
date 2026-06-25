import { SendEmailDto } from '@app/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  private readonly logger: Logger = new Logger(NotificationService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(payload: SendEmailDto, ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const originalMessage = ctx.getMessage();

    // console.log(channel, originalMessage);

    // const message = JSON.parse(originalMessage.content.toString());
    // console.log(message);

    await this.mailerService.sendMail({
      to: payload.email,
      subject: 'Welcome to AI-LMS',
      template: 'welcome',
      context: {
        name: payload.data.name,
      },
    });

    await channel.ack(originalMessage);
  }
}
