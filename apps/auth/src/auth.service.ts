import { SignUpDto, User } from '@app/common';
import { APPS, MESSAGES } from '@app/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    @Inject(APPS.USERS)
    private readonly usersClient: ClientProxy,
  ) {}

  async signUp(payload: SignUpDto) {
    this.logger.log('emitting message to users service');
    //call user service
    const result = await firstValueFrom(
      this.usersClient.send<User, SignUpDto>(MESSAGES.USERS.CREATED, payload),
    );
    //trigger rabbit mq notification
    return result;
  }
}
