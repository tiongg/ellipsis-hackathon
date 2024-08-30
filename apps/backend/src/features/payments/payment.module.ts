import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '@backend/entities/order.entity';
import { Payment } from '@backend/entities/payment.entity';
import { ListingModule } from '../listing/listing.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order]), ListingModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
