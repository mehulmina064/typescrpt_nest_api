import { Test, TestingModule } from '@nestjs/testing';
import { CanStateMachineService } from './state-machine.service';

describe('StateMachineService', () => {
  let service: CanStateMachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanStateMachineService],
    }).compile();

    service = module.get<CanStateMachineService>(CanStateMachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
