import { Test, TestingModule } from '@nestjs/testing';
import { LikesAndDislikesController } from './likes-and-dislikes.controller';
import { LikesAndDislikesService } from './likes-and-dislikes.service';

describe('LikesAndDislikesController', () => {
  let controller: LikesAndDislikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesAndDislikesController],
      providers: [LikesAndDislikesService],
    }).compile();

    controller = module.get<LikesAndDislikesController>(LikesAndDislikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
