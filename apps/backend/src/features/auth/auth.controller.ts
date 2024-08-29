import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticationService } from './auth.service';
import { RequestUser } from './decorators/request-user.decorator';
import { RequestUserType } from './types/request-user.type';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Get('self')
  getSelf(@RequestUser() user: RequestUserType) {
    return this.authService.getSelf(user.accountId);
  }
}
