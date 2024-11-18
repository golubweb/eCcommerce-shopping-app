import { Module }         from '@nestjs/common';
import { ConfigModule }   from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { development }   from '../../config/development';
import { AppController } from './app.controller';
import { AppService }    from './app.service';

import { UsersModule }    from './user/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports:     [
    UsersModule,
    ProductsModule,
    MongooseModule.forRoot(`mongodb://${development.mongoDB.host}/${development.mongoDB.database}`),
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [ AppController ],
  providers:   [ AppService ],
})
export class AppModule {}
