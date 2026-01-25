import * as Swagger from '@nestjs/swagger';
export class AuthResponseDto {
  @Swagger.ApiProperty({
    description: 'Authentication success status',
    example: true,
  })
  success: boolean;
}

export class AuthErrorResponseDto {
  @Swagger.ApiProperty({
    description: 'Error status code',
    example: '400',
  })
  statusCode: number;
  @Swagger.ApiProperty({
    description: 'Error message',
    example: ['blank_body', 'password_incorrect'],
  })
  message: string[];
  @Swagger.ApiProperty({
    description: 'Additional error message',
    example: 'Unauthorized',
  })
  error?: string;
}
