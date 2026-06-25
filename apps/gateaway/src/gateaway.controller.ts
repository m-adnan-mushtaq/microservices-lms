import { Controller, Get } from '@nestjs/common';
import { GateawayService } from './gateaway.service';

@Controller()
export class GateawayController {
  constructor(private readonly gateawayService: GateawayService) {}

  @Get()
  getHello(): string {
    return this.gateawayService.getHello();
  }
}
