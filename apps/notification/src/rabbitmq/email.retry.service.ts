import { EMAIL_ROUTING_KEYS, EXCHANGES } from '@app/common/constants';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class EmailRetryService {
  private readonly logger: Logger = new Logger(EmailRetryService.name);

  constructor(private readonly configService: ConfigService) {}

  async retryEmail(payload: any, retryCount: number, _error: Error) {
    this.logger.log(`Retrying email ${retryCount} times`);
    const connection = await amqp.connect(
      this.configService.get('RABBITMQ_URL') as string,
    );

    this.logger.log(`Retry count ${retryCount}`);
    this.logger.log(`Error ${_error}`);

    const channel = await connection.createChannel();

    if (retryCount < 2) {
      channel.publish(
        EXCHANGES.NOTIFICATIONS_RETRY,
        EMAIL_ROUTING_KEYS.EMAIL_RETRY_500,
        Buffer.from(JSON.stringify(payload)),
        {
          persistent: true,
          contentType: 'application/json',
          headers: {
            retryCount: retryCount + 1,
          },
        },
      );
    } else {
      channel.publish(
        EXCHANGES.NOTIFICATIONS_DEAD,
        EMAIL_ROUTING_KEYS.EMAIL_DEAD,
        Buffer.from(JSON.stringify(payload)),
        {
          persistent: true,
          contentType: 'application/json',
          headers: {
            retryCount: retryCount + 1,
          },
        },
      );
    }

    await channel.close();
    await connection.close();
  }
}
