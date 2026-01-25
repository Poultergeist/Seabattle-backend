import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '../common/auth/jwt.service';
import { type UserRepository } from 'src/domain/user/repositories/UserRepository';
import { AUTH_ERRORS } from 'src/constants/auth/auth.errors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('UserRepository')
    private readonly repo: UserRepository,
  ) {}

  private readonly jwtService: JwtService = new JwtService();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const cookies = request.cookies as Record<string, string | undefined>;
    const token = cookies['access_token'];

    if (!token) {
      throw new UnauthorizedException(AUTH_ERRORS.not_authorized);
    }

    try {
      const payload = await this.jwtService.verify(
        token,
        process.env.JWT_SECRET || 'default_secret',
      );

      if ((payload.exp || 0) < Date.now()) {
        throw new UnauthorizedException(AUTH_ERRORS.not_authorized);
      }

      const userId = payload.sub || payload.id;
      if (!userId) {
        throw new UnauthorizedException(AUTH_ERRORS.not_authorized);
      }

      const user = await this.repo.findById(Number(userId));

      if (!user) {
        throw new UnauthorizedException(AUTH_ERRORS.not_authorized);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (request as any).user = user;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (request as any).jwtPayload = payload;

      return true;
    } catch {
      throw new UnauthorizedException(AUTH_ERRORS.not_authorized);
    }
  }
}
