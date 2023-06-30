import {
  Module,
  NestModule,
  MiddlewareConsumer,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';

import {
  LoggerMiddleware,
  holaPanchito,
} from './common/middleware/logger.middleware';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AlsModule } from './common/als/als.module';
import { ClsModule, ClsMiddleware, ClsService } from 'nestjs-cls';
import { AsyncLocalStorage } from 'async_hooks';
import { EmailClsStore } from './common/als/store/email-cls.store';

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
    // ClsModule.forRoot({
    //   global: true,
    //   middleware: {
    //     mount: false,
    //     setup: (cls, req) => {
    //       console.log(req.body);
    //       holaPanchito();
    //       if (req.body.hasOwnProperty('personal')) console.log('personal');
    //       cls.set('email', 'emi@unounouno.como');
    //     },
    //   },
    // }),
    ConfigModule,
    HttpModule,
    CommonModule,
    AlsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
