import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { Account } from '@backend/entities/account.entity';
import { RequestUserType } from '../types/request-user.type';

export type JwtPayload = {
  accountId: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.accountRepository.findOne({
      where: {
        accountId: payload.accountId,
      },
      relations: {
        member: true,
      },
    });

    if (!user) throw new UnauthorizedException('Please log in to continue');

    return {
      accountId: payload.accountId,
      member: user.member,
    } as RequestUserType;
  }
}
