import { Module } from '@nestjs/common';
import { DiaryModule } from './diary/diary.module';
import { OrganizerModule } from './organizer/organizer.module';

@Module({
  imports: [DiaryModule, OrganizerModule],
})
export class LogbookModule {}
