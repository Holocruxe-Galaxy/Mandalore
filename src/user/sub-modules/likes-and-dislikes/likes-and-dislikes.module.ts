import { Module } from '@nestjs/common';
import { LikesAndDislikesService } from './likes-and-dislikes.service';
import { LikesAndDislikesController } from './likes-and-dislikes.controller';
import { Activity, Interest, LikesAndDislikes } from './schemas';

@Module({
  imports: [],
  controllers: [LikesAndDislikesController],
  providers: [LikesAndDislikesService],
})
export class LikesAndDislikesModule {}
