import * as Swagger from '@nestjs/swagger';

export class RegisterDto {
  @Swagger.ApiProperty({
    description: 'Users username',
    example: 'john_doe123',
  })
  public readonly username: string;
  @Swagger.ApiProperty({
    description: 'User password',
    example: 'SecurePass123!',
  })
  public readonly password: string;
  @Swagger.ApiProperty({
    description: 'User email',
    example: 'john_doe@example.com',
  })
  public readonly email: string;
}
