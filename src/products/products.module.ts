import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uproducts } from 'src/entities/Uproducts';
import { DvdsModule } from 'src/dvds/dvds.module';
import { BooksModule } from 'src/books/books.module';
import { CdsModule } from 'src/cds/cds.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Uproducts]),
    DvdsModule,
    BooksModule,
    CdsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
