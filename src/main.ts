import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

export const validationOptions: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: false,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const FRONTEND = configService.get<string>('FRONT_URL');

  app.use(cookieParser());
  app.enableCors({
    origin: `${FRONTEND}`,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  await app.listen(3001);
}
bootstrap();
