import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'email' })
  readonly email: string;
  @ApiProperty({ description: 'password', default: '123321' })
  password: string;
}
