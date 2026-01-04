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

@Injectable()
export class AuthResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result: string) => {
        if (result === AUTH_ERRORS.unexpected_error) {
          throw new HttpException(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (result === AUTH_ERRORS.user_not_found) {
          throw new HttpException(result, HttpStatus.NOT_FOUND);
        }

        if (AUTH_ERRORS[result]) {
          throw new HttpException(result, HttpStatus.BAD_REQUEST);
        }

        return { token: result };
      }),
    );
  }
}
