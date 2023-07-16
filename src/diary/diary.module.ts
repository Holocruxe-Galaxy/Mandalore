import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';

import { Diary, DiarySchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Diary.name,
        schema: DiarySchema,
      },
    ]),
  ],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
