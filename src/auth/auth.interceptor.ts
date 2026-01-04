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

        return { token: result };
      }),
    );
  }
}
