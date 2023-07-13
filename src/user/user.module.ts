import { Module, forwardRef } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './schemas';

import { MongooseModule } from '@nestjs/mongoose';
import { routes } from './routes';
import { UserSchema } from './schemas/user.schema';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from 'src/common/common.module';

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
    RouterModule.register(routes),
  ],
  controllers: [UserController],
  providers: [UserService, LoggerMiddleware],
  exports: [UserService],
})
export class UserModule {}
