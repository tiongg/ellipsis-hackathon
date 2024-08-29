import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import SgidClient, { generatePkcePair } from '@opengovsg/sgid-client';
import { type Request } from 'express';
import { type ParamsDictionary } from 'express-serve-static-core';
import { LRUCache } from 'lru-cache';
import { Strategy, type VerifiedCallback } from 'passport-custom';
import { type ParsedQs } from 'qs';

type SessionData = {
  state: string; //Stringyfied
  nonce?: string;
  codeVerifier: string;
};

type CustomRequest = Request<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  Record<string, any>
> & {
  // I swear this is here
  sessionID: string;
};

@Injectable()
export class SgidStrategy extends PassportStrategy(Strategy, 'sgid') {
  private readonly sgidClient: SgidClient;
  //TODO(TG): Save in db/Consider ttl cache instead
  private readonly sessions: LRUCache<string, SessionData>; //SessionId & SessionData

  constructor() {
    const clientId = process.env.SGID_CLIENT_ID as string;
    const clientSecret = process.env.SGID_CLIENT_SECRET as string;
    // The private key might be escaped so we need to fix the linebreaks first
    const privateKey = (process.env.SGID_PRIVATE_KEY ?? '').replace(
      /\\n/g,
      '\n'
    );
    const sgIdHostName = process.env.SGID_HOST_NAME ?? 'https://api.id.gov.sg';
    const callbackUrl = `${process.env.FRONTEND_DOMAIN}/auth/sgid/redirect`;

    super();

    this.sgidClient = new SgidClient({
      clientId,
      clientSecret,
      privateKey,
      redirectUri: callbackUrl,
      hostname: sgIdHostName,
    });

    this.sessions = new LRUCache({
      max: 20, //20 max 'dangling' sessions
    });
  }

  authenticate(req: CustomRequest, options?: any) {
    // Lets us save state from FE, no built in way from passport
    const state = `${JSON.stringify(req.query)}`;
    const sessionId = req.sessionID;

    // No session yet, create first
    if (!this.sessions.has(sessionId)) {
      const { codeChallenge, codeVerifier } = generatePkcePair();

      const { url, nonce } = this.sgidClient.authorizationUrl({
        state,
        codeChallenge,
        scope: ['openid', 'myinfo.name'],
      });

      // TODO (TG): Store in db
      this.sessions.set(sessionId, {
        state,
        nonce,
        codeVerifier,
      });

      this.redirect(url);
    } else {
      // Valid session, go to validate
      super.authenticate(req, options);
    }
  }

  async validate(req: CustomRequest, verified: VerifiedCallback) {
    const sessionId = req.sessionID;
    const sessionData = this.sessions.get(sessionId);

    // No session, idk how it got past authenticate function
    if (!sessionData) {
      console.error('[SGID] No session data!');
      return;
    }

    try {
      const { nonce, codeVerifier } = sessionData;
      const authCode = String(req.query['code']);

      if (!authCode) {
        console.error('[SGID] No auth code!');
        return;
      }

      const { accessToken, sub } = await this.sgidClient.callback({
        code: authCode,
        codeVerifier,
        nonce,
      });

      const { sub: sgid } = await this.sgidClient.userinfo({
        accessToken,
        sub,
      });

      verified(null, { sgid });
    } catch (ex) {
      console.error('[SGID] Error at validation.', ex);
      verified(ex, undefined);
      return;
    } finally {
      // We delete even if auth failed (most likely from revisiting the /auth/sgid?code=blahblah in the browser)
      // This allows us to still use the same session, and allow them to reattempt login
      this.sessions.delete(sessionId);
    }
  }
}
