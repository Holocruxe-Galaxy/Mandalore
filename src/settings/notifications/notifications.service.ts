import { Injectable } from '@nestjs/common';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }
}
