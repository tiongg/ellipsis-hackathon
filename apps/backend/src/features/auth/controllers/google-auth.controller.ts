import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../decorators/public-route.decorator';
import { GoogleOAuthGuard } from '../guards/google-auth.guard';
import { GoogleAuthenticationService } from '../services/google-auth.service';

@ApiTags('Google Authentication')
@Controller('auth/google')
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthService: GoogleAuthenticationService
  ) {}

  @Get('login')
  @Public()
  @ApiOperation({
    description:
      'Called for user login with Google. Automatically redirects to Google login page.',
  })
  @UseGuards(GoogleOAuthGuard)
  getSignInUrl() {
    return;
  }

  @Post('redirect')
  @Public()
  @ApiOperation({
    description:
      'Called upon Google authentication redirect. Exchanges Google auth code for JWT token.',
  })
  @UseGuards(GoogleOAuthGuard)
  async handleGoogleCallback(@Req() req: any) {
    const jwtToken = await this.googleAuthService.googleSignin(req.user);
    return { jwtToken };
  }
}
