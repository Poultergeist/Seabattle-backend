import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { UserRepository } from 'src/domain/user/repositories/UserRepository';
import { LoginDto } from 'src/application/user/dto/Login.dto';
import { RegisterDto } from 'src/application/user/dto/Register.dto';
import { AuthResponseInterceptor } from './auth.interceptor';
import * as Swagger from '@nestjs/swagger';
import { AuthResponseDto, AuthErrorResponseDto } from 'src/types/auth/Auth';
import { AuthValidationPipe } from './auth.pipe';

@Swagger.ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  i: Swagger.ApiOperationOptions;

  @Post('login')
  @Swagger.ApiOperation({
    summary: 'Login to account',
    description:
      '<p>Used for login.</p><p>Parameters: <code>username</code> - string, <code>password</code> - string</p>',
  })
  @Swagger.ApiResponse({
    status: 201,
    description: 'Returns text with token',
    type: AuthResponseDto,
  })
  @Swagger.ApiResponse({
    status: 404,
    description: 'User not found',
    type: AuthErrorResponseDto,
  })
  @Swagger.ApiResponse({
    status: 500,
    description: 'Something went wrong. IDC, just not it is no so interesting',
    type: AuthErrorResponseDto,
  })
  @Swagger.ApiResponse({
    status: 400,
    description:
      'When user sended something not that we expected, e.g. bad password or too short username',
    type: AuthErrorResponseDto,
  })
  @UsePipes(new AuthValidationPipe('login'))
  @UseInterceptors(AuthResponseInterceptor)
  async postLogin(@Body() loginDto: LoginDto): Promise<string> {
    return await this.authService.postLogin(loginDto, this.userRepository);
  }

  @Post('register')
  @Swagger.ApiOperation({
    summary: 'Register account',
    description:
      '<p>Used for register.</p><p>Parameters: <code>username</code> - string, <code>password</code> - string, <code>email</code> - string</p>',
  })
  @Swagger.ApiResponse({
    status: 201,
    description: 'Returns text with token',
    type: AuthResponseDto,
  })
  @Swagger.ApiResponse({
    status: 404,
    description: 'User not found',
    type: AuthErrorResponseDto,
  })
  @Swagger.ApiResponse({
    status: 500,
    description: 'Something went wrong. IDC, just not it is not so interesting',
    type: AuthErrorResponseDto,
  })
  @Swagger.ApiResponse({
    status: 400,
    description:
      'When user sended something not that we expected, e.g. bad password or too short username',
    type: AuthErrorResponseDto,
  })
  @UsePipes(new AuthValidationPipe('register'))
  @UseInterceptors(AuthResponseInterceptor)
  async postRegister(@Body() registerDto: RegisterDto): Promise<string> {
    return await this.authService.postRegister(
      registerDto,
      this.userRepository,
    );
  }
}
