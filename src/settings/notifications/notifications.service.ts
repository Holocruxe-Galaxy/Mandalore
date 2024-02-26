import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RequestWithUser } from 'src/common/interfaces';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(REQUEST) private request: RequestWithUser,

    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}
  async create(user: string) {
    return await this.notificationModel.create({ user });
  }

  async update(updateNotificationDto: UpdateNotificationDto) {
    const { userId } = this.request.user;
    return await this.notificationModel.findOneAndUpdate(
      { userId },
      updateNotificationDto,
      { new: true },
    );
  }

  async findOne(): Promise<Notification> {
    const { userId } = this.request.user;
    const exists = await this.notificationModel.findOne({ userId });

    if (!exists) return await this.create(userId);
    return exists;
  }
}
