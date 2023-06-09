import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesAndDislikesService } from './likes-and-dislikes.service';
import { LikesAndDislikesController } from './likes-and-dislikes.controller';
import { Activity, Interest, LikesAndDislikes } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Interest, LikesAndDislikes])],
  controllers: [LikesAndDislikesController],
  providers: [LikesAndDislikesService],
})
export class LikesAndDislikesModule {}
