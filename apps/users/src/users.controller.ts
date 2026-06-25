import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGES } from '@app/common/constants';
import { SignUpDto } from '@app/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }

  @MessagePattern(MESSAGES.USERS.CREATED)
  async createUser(@Payload() payload: SignUpDto) {
    return this.usersService.createUser(payload);
  }
}
