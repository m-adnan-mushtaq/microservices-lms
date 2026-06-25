import { SignUpDto } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(payload: SignUpDto) {
    this.logger.log('creating user', payload);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      id: '1',
      name: payload.name,
      email: payload.email,
    };
  }
}
