import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'email', default: 'test@nest.com' })
  readonly email: string;
  @ApiProperty({ description: 'password', default: '123321' })
  password: string;
  @ApiProperty({ description: 'username', default: 'EricXXX' })
  username: string;
}
