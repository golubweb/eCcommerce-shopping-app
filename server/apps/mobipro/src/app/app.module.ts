import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule }   from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import Config from '../config/config';

import { AppController } from './app.controller';
import { AppService }    from './app.service';

import { AuthModule }     from './authorization/auth.module';
import { UsersModule }    from './user/users.module';
import { ProductsModule } from './products/products.module';

import { LoggingMiddleware } from '../../../../shared/middleware/logging/logging.middleware';

@Module({
	imports:     [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			load: [ Config ]
		}),
		MongooseModule.forRoot(`mongodb://${Config().mongoDB.host}/${Config().mongoDB.database}`),
		AuthModule,
		UsersModule,
		ProductsModule
	],
	controllers: [ AppController ],
	providers:   [ AppService ],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggingMiddleware).forRoutes('*');
	}
}
