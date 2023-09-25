import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const validationOptions: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: false,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('First Example')
    .setDescription('This is a mere example')
    .setVersion('0.1')
    .addTag('first')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const LOCAL = configService.get<string>('LOCAL');
  const FRONTEND = configService.get<string>('FRONT_URL');

  app.use(cookieParser());

  if (LOCAL) {
    app.enableCors({
      origin: `${FRONTEND}`,
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: '*',
      credentials: true,
    });
  }

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  await app.listen(3001);
}
bootstrap();
