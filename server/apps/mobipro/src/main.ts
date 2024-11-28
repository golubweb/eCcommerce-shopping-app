import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory }            from '@nestjs/core';
import helmet from 'helmet';

import { AppModule }   from './app/app.module';
import { originsUrls } from "../../../shared/constants/allowed-origins-urls";

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
		origin:  (origin, callback) => {
			console.log('origin =========================> ', origin);
			(originsUrls.includes(origin)) ? callback(null, true) : callback(new Error('Not allowed by CORS'), false);
		},
		methods:     'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true 
	});

	await APP.listen(process.env.API_PORT || 3000);

	Logger.log(`http://localhost:${process.env.API_PORT || 3000}/${process.env.GLOBAL_PREFIX}`);
}

bootstrap();
