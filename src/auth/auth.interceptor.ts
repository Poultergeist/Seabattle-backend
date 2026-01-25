import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { AUTH_ERRORS } from 'src/constants/auth/auth.errors';
import { Response } from 'express';
import { JwtService } from 'src/common/auth/jwt.service';

@Injectable()
export class AuthResponseInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((result: string) => {
        if (result === AUTH_ERRORS.unexpected_error) {
          throw new HttpException(
            {
              message: result,
              code: HttpStatus.INTERNAL_SERVER_ERROR,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        if (result === AUTH_ERRORS.user_not_found) {
          throw new HttpException(
            { message: result, code: HttpStatus.NOT_FOUND },
            HttpStatus.NOT_FOUND,
          );
        }

        if (AUTH_ERRORS[result]) {
          throw new HttpException(
            { message: result, code: HttpStatus.BAD_REQUEST },
            HttpStatus.BAD_REQUEST,
          );
        }

        res.cookie('access_token', result, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: this.jwtService.parseExpiration(
            process.env.JWT_EXPIRATION || '3600s',
          ),
        });

        return {
          success: true,
        };
      }),
    );
  }
}
