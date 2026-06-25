import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGES } from '@app/common/constants';
import { SignUpDto } from '@app/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(MESSAGES.AUTH.SIGN_UP)
  async signUp(@Payload() payload: SignUpDto) {
    return this.authService.signUp(payload);
  }
}
