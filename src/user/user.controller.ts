import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Scope,
  Inject,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailClsStore } from 'src/common/als/store/email-cls.store';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

interface UserKey {
  email: string;
}

interface RequestWidhUser extends Request {
  user: UserKey;
}

@Controller({ path: 'user', scope: Scope.REQUEST })
export class UserController {
  constructor(
    @Inject(REQUEST) private request: RequestWidhUser,
    private readonly userService: UserService, // private readonly cls: ClsService<EmailClsStore>,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('erertertrt');
    const hola = this.request.user;
    console.log('esto es hola', hola);

    return;
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
