import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config';
import {
  ClientsProviderAsyncOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

export class Helper {
  public static createTCPClient(
    appName: string,
    portKey: string,
    host: string = 'localhost',
  ): ClientsProviderAsyncOptions {
    return {
      name: appName,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          host,
          port: configService.get<number>(portKey),
        },
      }),
    };
  }

  public static createRABBITMQClient(
    appName: string,
    queueName: string,
  ): ClientsProviderAsyncOptions {
    return {
      name: appName,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.get<string>('RABBITMQ_URL') as string],
          queue: queueName,
          queueOptions: {
            durable: true,
          },
        },
      }),
    };
  }

  public static createMicroserviceOptions(
    queueName: string,
  ): MicroserviceOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL as string],
        queue: queueName,
        queueOptions: {
          durable: true,
        },
        noAck: false,
      },
    };
  }
}
