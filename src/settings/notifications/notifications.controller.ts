import { Controller, Body, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  @Patch()
  update(@Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(updateNotificationDto);
  }
}
