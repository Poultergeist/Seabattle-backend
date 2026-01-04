import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { LoginRequestDto } from 'src/application/auth/LoginRequestDto';
import { RegisterRequestDto } from 'src/application/auth/RegisterRequestDto';
import { loginSchema, registerSchema } from './auth.schemas';
import { AUTH_ERRORS } from 'src/constants/auth/auth.errors';

@Injectable()
export class AuthValidationPipe implements PipeTransform {
  constructor(private readonly mode: 'login' | 'register') {}
  transform(value: LoginRequestDto | RegisterRequestDto) {
    if (this.mode === 'login') {
      if (!value || !value.username || !value.password) {
        throw new BadRequestException([AUTH_ERRORS.blank_body]);
      }

      const result = loginSchema.safeParse(value as LoginRequestDto);
      if (!result.success) {
        throw new BadRequestException([
          ...new Set(result.error.issues.map((val) => val.message)),
        ]);
      }
    }
    if (this.mode === 'register') {
      if (!value || !value.username || !value.password || !value.email) {
        throw new BadRequestException([AUTH_ERRORS.blank_body]);
      }

      const result = registerSchema.safeParse(value as RegisterRequestDto);
      if (!result.success) {
        throw new BadRequestException([
          ...new Set(result.error.issues.map((val) => val.message)),
        ]);
      }
    }
    return value;
  }
}
