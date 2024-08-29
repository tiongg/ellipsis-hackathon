import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '@backend/entities/account.entity';
import { MemberService } from '../member/member.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>, //Imported incase we need in future
    private readonly memberService: MemberService
  ) {}

  async getSelf(accountId: string) {
    return this.memberService.getMember(accountId);
  }
}
