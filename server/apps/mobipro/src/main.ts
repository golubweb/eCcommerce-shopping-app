import {Logger }       from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet          from 'helmet';

import { AppModule }      from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from '../../../shared/middleware/logging/http-exception.filter';

async function bootstrap() {
	const APP = await NestFactory.create(AppModule);

	APP.useGlobalPipes(new ValidationPipe({
		whitelist:            true,
		forbidNonWhitelisted: true,
		disableErrorMessages: false
	}));
	
	APP.use(helmet());
	APP.useGlobalFilters(new HttpExceptionFilter());
	APP.setGlobalPrefix(process.env.GLOBAL_PREFIX); 

	/*APP.enableCors({
		origin:  'http://localhost:3000/mobipro/api',
		methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
		allowedHeaders: 'Content-Type, Accept'
	})*/

	await APP.listen(process.env.API_PORT || 3000);

	Logger.log(`http://localhost:${process.env.API_PORT || 3000}/${process.env.GLOBAL_PREFIX}`);
}

bootstrap();
