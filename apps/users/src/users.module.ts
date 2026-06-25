import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule, LoggerModule } from '@app/common';

@Module({
  imports: [ConfigModule, LoggerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
