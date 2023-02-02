import { Test, TestingModule } from '@nestjs/testing';
import { CanWhatsappNotificationService } from './whatsapp.service';

describe('WhatsappService', () => {
  let service: CanWhatsappNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanWhatsappNotificationService],
    }).compile();

    service = module.get<CanWhatsappNotificationService>(CanWhatsappNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
