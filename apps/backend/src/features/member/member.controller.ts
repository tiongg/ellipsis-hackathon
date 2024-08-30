import { Body, Controller, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompleteProfileDto } from '@shared-types/features/onboarding/complete-profile.dto';

import { RequestUser } from '../auth/decorators/request-user.decorator';
import { RequestUserType } from '../auth/types/request-user.type';
import { MemberService } from './member.service';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Patch('complete-profile')
  async completeProfile(
    @RequestUser() user: RequestUserType,
    @Body() dto: CompleteProfileDto
  ) {
    return this.memberService.completeProfile(user.accountId, dto.name);
  }
}
