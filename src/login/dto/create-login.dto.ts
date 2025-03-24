/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @Length(1, 10, { message: '用户名长度为1-10' })
  name: string;

  @IsNotEmpty({ message: '用户名不能为空' })
  @IsNumber({}, { message: '年龄必须是数字' })
  age: number;
}
