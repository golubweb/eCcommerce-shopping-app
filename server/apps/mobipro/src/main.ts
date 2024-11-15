import { Logger }      from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet          from 'helmet';

import { AppModule }      from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app      = await NestFactory.create(AppModule),
    globalPrefix = 'mobipro/api';

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);

  await app.listen(process.env.PORT || 3000);

  Logger.log(`http://localhost:${process.env.PORT || 3000}/${globalPrefix}`);
}

bootstrap();
