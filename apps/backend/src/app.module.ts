import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServerStatusModule } from '@backend/features/server-status/server-status.module';
import { DatabaseConfigurationService } from './config/typeorm.config';
import { AuthenticationModule } from './features/auth/auth.module';
import { JwtAuthGuard } from './features/auth/guards/jwt-auth.guard';
import { ListingModule } from './features/listing/listing.module';
import { MemberModule } from './features/member/member.module';
import { PaymentModule } from './features/payments/payment.module';
import { ProductsModule } from './features/products/products.module';
import { StorefrontModule } from './features/storefront/storefront.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigurationService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServerStatusModule,
    AuthenticationModule,
    MemberModule,
    StorefrontModule,
    ProductsModule,
    ListingModule,
    PaymentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
