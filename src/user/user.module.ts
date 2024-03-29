import { Module, forwardRef } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { CommonModule } from 'src/common/common.module';
import { FormModule } from './form/form.module';

import { User, UserSchema } from './schemas';

import { routes } from './routes';
import { NotificationsModule } from 'src/settings/notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ConfigModule,
    HttpModule,
    CommonModule,
    FormModule,
    forwardRef(() => NotificationsModule),
    RouterModule.register(routes),
  ],
  controllers: [UserController],
  providers: [UserService, LoggerMiddleware],
  exports: [UserService],
})
export class UserModule {}
