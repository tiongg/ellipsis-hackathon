import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServerStatusModule } from '@backend/features/server-status/server-status.module';
import { DatabaseConfigurationService } from './config/typeorm.config';
import { AuthenticationModule } from './features/auth/auth.module';
import { JwtAuthGuard } from './features/auth/guards/jwt-auth.guard';
import { MemberModule } from './features/member/member.module';
import { ProductsModule } from './features/products/products.module';
import { StorefrontModule } from './features/storefront/storefront.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigurationService,
    }),
    ServerStatusModule,
    AuthenticationModule,
    MemberModule,
    StorefrontModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
