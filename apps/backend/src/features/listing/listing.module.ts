import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Listing } from '@backend/entities/listing.entity';
import { Product } from '@backend/entities/product.entity';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, Product])],
  providers: [ListingService],
  controllers: [ListingController],
  exports: [ListingService],
})
export class ListingModule {}
