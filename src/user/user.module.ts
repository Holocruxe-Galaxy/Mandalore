import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { CommonModule } from 'src/common/common.module';
import { FormModule } from './form/form.module';

import { User } from './schemas';
import { UserSchema } from './schemas/user.schema';

import { routes } from './routes';

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
    RouterModule.register(routes),
  ],
  controllers: [UserController],
  providers: [UserService, LoggerMiddleware],
  exports: [UserService],
})
export class UserModule {}
