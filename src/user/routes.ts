import { Routes } from '@nestjs/core';
import { FormModule } from './form/form.module';

export const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'form',
        module: FormModule,
      },
    ],
  },
];
