import { Logger }      from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet          from 'helmet';

import { AppModule }      from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(process.env.GLOBAL_PREFIX);

  /*app.enableCors({
    origin:  'http://localhost:3000/mobipro/api',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-Type, Accept',
  })*/

  await app.listen(process.env.PORT || 3000);

  Logger.log(`http://localhost:${process.env.PORT || 3000}/${process.env.GLOBAL_PREFIX}`);
}

bootstrap();
