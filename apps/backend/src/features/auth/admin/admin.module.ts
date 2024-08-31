import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Listing } from '@backend/entities/listing.entity';
import { Product } from '@backend/entities/product.entity';
import { Store } from '@backend/entities/store.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Store, Listing])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
