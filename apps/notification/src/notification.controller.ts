import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { MESSAGES } from '@app/common/constants';
import { SendEmailDto } from '@app/common/dto/notification/notificatin.dto';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern(MESSAGES.NOTIFICATIONS.SEND_EMAIL)
  async sendEmail(@Payload() payload: SendEmailDto, @Ctx() ctx: RmqContext) {
    await this.notificationService.sendEmail(payload, ctx);
  }
}
