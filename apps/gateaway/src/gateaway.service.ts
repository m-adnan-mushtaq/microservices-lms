import { Injectable } from '@nestjs/common';

@Injectable()
export class GateawayService {
  getHello(): string {
    return 'Hello World!';
  }
}
