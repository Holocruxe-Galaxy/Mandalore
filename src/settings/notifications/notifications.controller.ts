import { Controller, Body, Get, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  @Get()
  get() {
    return this.notificationsService.findOne();
  }

  @Patch()
  update(@Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(updateNotificationDto);
  }
}
