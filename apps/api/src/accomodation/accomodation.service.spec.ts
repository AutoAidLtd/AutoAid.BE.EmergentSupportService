import { Test, TestingModule } from '@nestjs/testing';
import { AccomodationService } from './accomodation.service';

describe('AccomodationService', () => {
  let service: AccomodationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccomodationService],
    }).compile();

    service = module.get<AccomodationService>(AccomodationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
