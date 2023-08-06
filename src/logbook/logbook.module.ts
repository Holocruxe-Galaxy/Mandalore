import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { DiaryModule } from './diary/diary.module';
import { OrganizerModule } from './organizer/organizer.module';
import { routes } from './routes';

@Module({
  imports: [DiaryModule, OrganizerModule, RouterModule.register(routes)],
})
export class LogbookModule {}
