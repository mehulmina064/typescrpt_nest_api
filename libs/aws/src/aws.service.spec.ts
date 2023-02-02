import { Test, TestingModule } from '@nestjs/testing';
import { CanAwsService } from './aws.service';

describe('AwsService', () => {
  let service: CanAwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanAwsService],
    }).compile();

    service = module.get<CanAwsService>(CanAwsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
