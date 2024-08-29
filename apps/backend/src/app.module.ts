import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServerStatusModule } from '@backend/features/server-status/server-status.module';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseConfigurationService } from './config/typeorm.config';
import { AuthenticationModule } from './features/auth/auth.module';
import { JwtAuthGuard } from './features/auth/guards/jwt-auth.guard';
import { MemberModule } from './features/member/member.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigurationService,
    }),
    ServerStatusModule,
    AuthenticationModule,
    MemberModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
