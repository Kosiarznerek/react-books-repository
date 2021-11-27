import { Test, TestingModule } from '@nestjs/testing';
import { AppRepositoryService } from './app.repository.service';

describe('AppRepositoryService', () => {
  let service: AppRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppRepositoryService],
    }).compile();

    service = module.get<AppRepositoryService>(AppRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
