import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';

import { Diary, DiarySchema } from './schemas';
import { CommonModule } from 'src/common/common.module';
import { ImagesModule } from 'src/common/images/images.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Diary.name,
        schema: DiarySchema,
      },
    ]),
    CommonModule,
    ImagesModule,
  ],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
