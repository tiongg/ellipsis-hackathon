import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServerStatusModule } from '@backend/features/server-status/server-status.module';
import { DatabaseConfigurationService } from './config/typeorm.config';
import { AuthenticationModule } from './features/auth/auth.module';
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
})
export class AppModule {}
