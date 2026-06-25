import { Test, TestingModule } from '@nestjs/testing';
import { GateawayController } from './gateaway.controller';
import { GateawayService } from './gateaway.service';

describe('GateawayController', () => {
  let gateawayController: GateawayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GateawayController],
      providers: [GateawayService],
    }).compile();

    gateawayController = app.get<GateawayController>(GateawayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gateawayController.getHello()).toBe('Hello World!');
    });
  });
});
