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

	APP.enableCors({
		origin: (origin, callback) => {
			if (origin === 'http://localhost:4200') {
				callback(new Error('Not allowed by CORS'), false);
			} else {
				callback(null, true);
			}
		},
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	});

	await APP.listen(process.env.API_PORT || 3000);

	Logger.log(`http://localhost:${process.env.API_PORT || 3000}/${process.env.GLOBAL_PREFIX}`);
}

bootstrap();
