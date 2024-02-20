import { Controller, Get, Post, Param, Delete, Scope } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({ path: 'user', scope: Scope.REQUEST })
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create() {
  //   return this.userService.create();
  // }

  // @Get('all')
  // findAll() {
  //   // Email, Role, Plan, Status
  //   return this.userService.findAll();
  // }

  // @Get('data')
  // findData() {
  //   // Should return an object with the properties:
  //   // Status, Role, Country
  //   return this.userService.findOne();
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
