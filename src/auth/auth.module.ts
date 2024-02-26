import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
