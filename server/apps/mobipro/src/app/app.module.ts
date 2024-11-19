import { Module }         from '@nestjs/common';
import { ConfigModule }   from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import Config            from '../config/config';
import { AppController } from './app.controller';
import { AppService }    from './app.service';

import { AuthModule }     from './authorization/auth.module';
import { UsersModule }    from './user/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports:     [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [ Config ]
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    UsersModule,
    ProductsModule,
    MongooseModule.forRoot(`mongodb://${Config().mongoDB.host}/${Config().mongoDB.database}`)
  ],
  controllers: [ AppController ],
  providers:   [ AppService ],
})
export class AppModule {}
