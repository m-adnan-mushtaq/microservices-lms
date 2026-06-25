import { EMAIL_ROUTING_KEYS, EXCHANGES, QUEUES } from '@app/common/constants';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

/**
 * Topology Summary
 * --------------------------------
 * 1. A message is published to the notifications.exchange with the routing key email.send
 * 2. The message is routed to the notifications.queue
 * 3. The message is processed by the notification service
 * 4. If the message is not processed successfully, it is retried after 500ms
 * 5. If the message is not processed successfully after 1 retries, it is moved to the notifications.dead.queue
 * 6. The message is published to the notifications.exchange with the routing key email.send
 * 7. The message is routed to the notifications.queue
 *
 */
@Injectable()
export class EmailTopology implements OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger = new Logger(EmailTopology.name);

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.logger.log('Initializing email topology');
    const connection = await amqp.connect(
      this.configService.get('RABBITMQ_URL') as string,
    );

    const channel = await connection.createChannel();

    //now create a email topology
    // first register mail queue exchange
    await channel.assertExchange(EXCHANGES.NOTIFICATIONS, 'direct', {
      durable: true,
    });

    await channel.assertExchange(EXCHANGES.NOTIFICATIONS_RETRY, 'direct', {
      durable: true,
    });

    await channel.assertExchange(EXCHANGES.NOTIFICATIONS_DEAD, 'direct', {
      durable: true,
    });

    await channel.assertQueue(QUEUES.NOTIFICATIONS, { durable: true });

    await channel.bindQueue(
      QUEUES.NOTIFICATIONS,
      EXCHANGES.NOTIFICATIONS,
      EMAIL_ROUTING_KEYS.SEND_EMAIL,
    );

    await channel.assertQueue(QUEUES.NOTIFICATIONS_RETRY, {
      durable: true,
      arguments: {
        'x-message-ttl': 500,
        'x-dead-letter-exchange': EXCHANGES.NOTIFICATIONS,
        'x-dead-letter-routing-key': EMAIL_ROUTING_KEYS.SEND_EMAIL,
      },
    });

    await channel.bindQueue(
      QUEUES.NOTIFICATIONS_RETRY,
      EXCHANGES.NOTIFICATIONS_RETRY,
      EMAIL_ROUTING_KEYS.EMAIL_RETRY_500,
    );

    await channel.assertQueue(QUEUES.NOTIFICATIONS_DEAD, {
      durable: true,
    });

    await channel.bindQueue(
      QUEUES.NOTIFICATIONS_DEAD,
      EXCHANGES.NOTIFICATIONS_DEAD,
      EMAIL_ROUTING_KEYS.EMAIL_DEAD,
    );

    await channel.close();
    await connection.close();
  }

  onModuleDestroy() {
    this.logger.log('Destroying email topology');
  }
}
