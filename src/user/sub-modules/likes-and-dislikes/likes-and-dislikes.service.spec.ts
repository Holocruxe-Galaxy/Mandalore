import { Test, TestingModule } from '@nestjs/testing';
import { LikesAndDislikesService } from './likes-and-dislikes.service';

describe('LikesAndDislikesService', () => {
  let service: LikesAndDislikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikesAndDislikesService],
    }).compile();

    service = module.get<LikesAndDislikesService>(LikesAndDislikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
