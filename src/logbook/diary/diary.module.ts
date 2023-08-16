import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';

import { Diary, DiarySchema } from './schemas';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Diary.name,
        schema: DiarySchema,
      },
    ]),
    CommonModule,
  ],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
