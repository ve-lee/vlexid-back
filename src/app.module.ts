import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import pinoFactory from './common/pino.factory';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Uproducts } from './entities/Uproducts';
import { ProductsModule } from './products/products.module';
import { DvdsModule } from './dvds/dvds.module';
import { BooksModule } from './books/books.module';
import { CdsModule } from './cds/cds.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: pinoFactory,
    }),
    CacheModule.register(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('HOST'),
        port: config.get('DB_PORT'),
        username: config.get('USERNAME'),
        password: config.get('PASSWORD'),
        database: config.get('DATABASE'),
        entities: [Uproducts],
        synchronize: true,
      }),
    }),
    ProductsModule,
    DvdsModule,
    BooksModule,
    CdsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
