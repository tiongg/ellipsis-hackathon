import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../decorators/public-route.decorator';
import { SgIdAuthGuard } from '../guards/sgid-auth.guard';
import { SgidAuthenticationService } from '../services/sgid-auth.service';

@ApiTags('Sgid Authentication')
@Controller('auth/sgid')
export class SgidAuthenticationController {
  constructor(private readonly authService: SgidAuthenticationService) {}

  @Get('login')
  @Public()
  @ApiOperation({
    description:
      'Called for user login with Sgid. Automatically redirects to Sgid login page.',
  })
  @UseGuards(SgIdAuthGuard)
  getSignInUrl() {
    return;
  }

  @Post('redirect')
  @Public()
  @ApiOperation({
    description:
      'Called upon Sgid authentication redirect. Exchanges Sgid auth code for JWT token.',
  })
  @UseGuards(SgIdAuthGuard)
  async handleSgidCallback(@Req() req: any) {
    const jwtToken = await this.authService.sgidSignIn(req.user);
    return { jwtToken };
  }
}
