import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Member } from '../../entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>
  ) {}

  createNewAccount(accountId: string) {
    return this.memberRepository.save({
      accountId,
      username: accountId,
    });
  }

  getMember(accountId: string) {
    return this.memberRepository.findOneBy({ accountId });
  }

  /**
   * Compelete profile onboarding (Currently just name)
   * @param accountId - Account id of the member
   * @param name - Members name
   */
  completeProfile(accountId: string, name: string) {
    return this.memberRepository.update(
      { accountId },
      {
        name,
      }
    );
  }
}
