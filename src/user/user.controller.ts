import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  Header,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import Response from 'express';

interface CaptchaBody {
  code: string;
}

interface SessionCaptcha {
  code: string;
}

@ApiTags('user')
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('test')
  testUserService(
    @Body() body: CaptchaBody,
    @Session() session: SessionCaptcha,
  ) {
    console.log(body);
    console.log(session.code);
    if (
      body?.code?.toLocaleLowerCase() !== session?.code?.toLocaleLowerCase()
    ) {
      // Return an object with code and message for consistency
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: '验证码错误',
      };
    }
    return {
      code: 200,
      msg: 'test',
    };
    // return this.userService.testUserService(body);
  }

  @Get('code')
  @ApiOperation({
    summary: 'Get captcha code',
  })
  createCode(@Req() req, @Res() res, @Session() session) {
    const captcha = this.userService.captchaCode();
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post()
  @ApiOperation({
    summary: 'Add user',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
