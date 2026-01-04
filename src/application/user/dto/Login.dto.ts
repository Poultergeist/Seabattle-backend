import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Username for authentication',
    example: 'john_doe',
  })
  readonly username: string;

  @ApiProperty({
    description: 'User password',
    example: 'SecurePass123!',
  })
  readonly password: string;
}
