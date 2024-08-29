import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ParsedQs } from 'qs';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.FRONTEND_DOMAIN}/auth/google/redirect`,
      scope: ['openid'],
    });
  }

  authenticate(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    options?: any
  ): void {
    //Lets us save state from FE, no built in way from passport
    options.state = JSON.stringify(req.query);
    super.authenticate(req, options);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { id } = profile;
    done(null, { googleId: id });
  }
}
