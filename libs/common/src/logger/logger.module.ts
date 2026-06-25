import { LoggerModule as PinoLoggerModule } from 'pino-nestjs';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            singleLine: false,
            messageFormat: '{req.method} {req.url} | {msg}',
          },
        },
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
