import { Routes } from '@nestjs/core';
import { DiaryModule } from './diary/diary.module';
import { OrganizerModule } from './organizer/organizer.module';

export const routes: Routes = [
  {
    path: 'logbook',
    children: [
      {
        path: 'diary',
        module: DiaryModule,
      },
      {
        path: 'organizer',
        module: OrganizerModule,
      },
    ],
  },
];
