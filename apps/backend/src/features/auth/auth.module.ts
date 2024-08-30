import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from '@backend/entities/account.entity';
import { Member } from '@backend/entities/member.entity';
import { MemberService } from '../member/member.service';
import { AuthenticationController } from './auth.controller';
import { AuthenticationService } from './auth.service';
import { GoogleAuthenticationController } from './controllers/google-auth.controller';
import { GoogleAuthenticationService } from './services/google-auth.service';
import { GoogleStrategy } from './strategy/google-auth.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Member]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_DURATION') || '2h',
        },
      }),
    }),
  ],
  controllers: [
    AuthenticationController,
    GoogleAuthenticationController,
    // SgidAuthenticationController,
  ],
  providers: [
    AuthenticationService,
    GoogleAuthenticationService,
    // SgidAuthenticationService,
    MemberService,
    GoogleStrategy,
    // SgidStrategy,
    JwtStrategy,
  ],
})
export class AuthenticationModule {}
