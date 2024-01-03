import { Controller, Get, Post, Param, Delete, Scope, Put, Body, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ChangeStatusDto } from './dto'

@ApiTags('User')
@Controller({ path: 'user', scope: Scope.REQUEST })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create() {
    return this.userService.create();
  }

  @Get('all')
  findAll() {
    // Email, Role, Plan, Status, Name
    return this.userService.findAll();
  }

  @Get('data')
  findData() {
    // Should return an object with the properties:
    // Status, Role, Country
    return this.userService.findOne();
  }

  @Get('data/:userId')
  findOneById(@Param('userId') userId: string) {
   // Should return an object with the properties:
   // Status, Role, Country
   return this.userService.findOneById(userId);
  }

  @Patch('status-ban')
  async statusBanUsers(@Body() data: ChangeStatusDto){
    return this.userService.banUsers(data);
  }

  @Patch('status-reactivate')
  async statusReactivateUsers(@Body() data: ChangeStatusDto){
    return this.userService.reactivateUsers(data);
  }

  @Patch('status-suspend')
  async statusSuspendUsers(@Body() data: ChangeStatusDto) {
    return this.userService.suspendUsers(data)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
