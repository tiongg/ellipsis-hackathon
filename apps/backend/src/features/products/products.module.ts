import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Listing } from '@backend/entities/listing.entity';
import { Product } from '@backend/entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Listing])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
