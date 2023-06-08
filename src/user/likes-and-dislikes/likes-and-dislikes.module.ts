import { Module } from '@nestjs/common';
import { LikesAndDislikesService } from './likes-and-dislikes.service';
import { LikesAndDislikesController } from './likes-and-dislikes.controller';

@Module({
  controllers: [LikesAndDislikesController],
  providers: [LikesAndDislikesService]
})
export class LikesAndDislikesModule {}
