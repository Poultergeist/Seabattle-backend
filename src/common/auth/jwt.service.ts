import { Injectable } from '@nestjs/common';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

@Injectable()
export class JwtService {
  async sign(
    payload: JWTPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    const encoder = new TextEncoder();
    const expiration = Date.now() + this.parseExpiration(expiresIn);
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(expiration)
      .sign(encoder.encode(secret));
  }

  async verify(token: string, secret: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );
    return payload;
  }

  parseExpiration(str: string): number {
    const match = str.match(/^(\d+)([smhd])$/);
    if (!match) throw new Error('Invalid JWT_EXPIRATION format');

    const value = parseInt(match[1], 10);
    const unit = match[2];

    const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
    return value * multipliers[unit];
  }
}
