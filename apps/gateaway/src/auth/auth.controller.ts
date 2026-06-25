import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '@app/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth Gateway')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() payload: SignUpDto) {
    return this.authService.signUp(payload);
  }
}
