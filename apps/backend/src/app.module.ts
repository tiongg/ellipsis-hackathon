import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServerStatusModule } from '@backend/features/server-status/server-status.module';
import { DatabaseConfigurationService } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigurationService,
    }),
    ServerStatusModule,
  ],
})
export class AppModule {}
