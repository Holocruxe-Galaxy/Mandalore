import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Scope,
} from '@nestjs/common';
import { UserService } from './user.service';

import { UpdateUserDto } from './dto/update-user.dto';

@Controller({ path: 'user', scope: Scope.REQUEST })
export class UserController {
  constructor(
    private readonly userService: UserService, // private readonly cls: ClsService<EmailClsStore>,
  ) {}

  @Post()
  create() {
    return this.userService.create();
  }

  @Get('all')
  findAll() {
    // Email, Role, Plan, Status
    return this.userService.findAll();
  }

  @Get('data')
  find() {
    // Should return an object with the properties:
    // Status, Role, Country
    return this.userService.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
