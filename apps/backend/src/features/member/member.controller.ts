import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MemberService } from './member.service';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
}
