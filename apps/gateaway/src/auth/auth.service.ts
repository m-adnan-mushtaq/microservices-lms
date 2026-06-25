import { constants, SignUpDto, SignUpResponse } from '@app/common';
import { MESSAGES } from '@app/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(constants.APPS.AUTH) private readonly authClient: ClientProxy,
  ) {}

  async signUp(payload: SignUpDto) {
    const result = await firstValueFrom(
      this.authClient.send<SignUpResponse, SignUpDto>(
        MESSAGES.AUTH.SIGN_UP,
        payload,
      ),
    );
    return result;
  }
}
