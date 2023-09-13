import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';

import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { HttpModule } from '@nestjs/axios';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { LogbookModule } from './logbook/logbook.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DATABASE'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    HttpModule,
    CommonModule,
    AuthModule,
    UserModule,
    ChatModule,
    LogbookModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude('/').forRoutes('*');
  }
}
