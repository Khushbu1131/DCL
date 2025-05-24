import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password (minimum 6 characters)',
    example: 'strongPassword123',
    minLength: 6,
  })
  @MinLength(6)
  password: string;
}
/*export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}*/
