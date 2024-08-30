import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '@backend/entities/account.entity';
import { MemberService } from '@backend/features/member/member.service';
import { SgidAccountType } from '../types/sgid-account.type';

@Injectable()
export class SgidAuthenticationService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService
  ) {}

  async sgidSignIn(userData: SgidAccountType) {
    if (!userData) throw new BadRequestException('Unauthenticated by sgid!');

    let account = await this.accountRepository.findOneBy({
      sgid: userData.sgid,
    });

    if (!account) {
      account = await this.accountRepository.save({
        sgid: userData.sgid,
      });

      await this.memberService.createNewAccount(account.accountId);
    }

    const jwtToken = await this.jwtService.signAsync({
      accountId: account.accountId,
    });

    return jwtToken;
  }
}
