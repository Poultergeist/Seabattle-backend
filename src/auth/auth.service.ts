import { Body, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/application/user/dto/Login.dto';
import { RegisterDto } from 'src/application/user/dto/Register.dto';
import { LoginUseCase } from 'src/application/user/use-cases/Login.usecase';
import { RegisterUseCase } from 'src/application/user/use-cases/Register.usecase';
import { HashService } from 'src/common/auth/hash.service';
import { AUTH_ERRORS } from 'src/constants/auth/auth.errors';
import { type UserRepository } from 'src/domain/user/repositories/UserRepository';

@Injectable()
export class AuthService {
  async postLogin(
    @Body() loginDto: LoginDto,
    users: UserRepository,
  ): Promise<string> {
    const result = await new LoginUseCase(users, new HashService()).execute(
      loginDto,
    );

    if (!result) {
      return AUTH_ERRORS.unexpected_error;
    }

    return result;
  }

  async postRegister(
    @Body() registerDto: RegisterDto,
    users: UserRepository,
  ): Promise<string> {
    const result = await new RegisterUseCase(users, new HashService()).execute(
      registerDto,
    );

    if (!result) {
      return AUTH_ERRORS.unexpected_error;
    }

    return result;
  }
}
