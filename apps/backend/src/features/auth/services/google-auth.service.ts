import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '@backend/entities/account.entity';
import { MemberService } from '@backend/features/member/member.service';
import { GoogleAccountType } from '../types/google-account.type';

@Injectable()
export class GoogleAuthenticationService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService
  ) {}

  async googleSignin(userData: GoogleAccountType) {
    if (!userData) throw new BadRequestException('Unauthenticated by google');
    let account = await this.accountRepository.findOneBy({
      googleId: userData.googleId,
    });

    if (!account) {
      account = await this.accountRepository.save({
        googleId: userData.googleId,
      });

      await this.memberService.createNewAccount(account.accountId);
    }

    const jwtToken = await this.jwtService.signAsync({
      accountId: account.accountId,
    });

    return jwtToken;
  }
}
