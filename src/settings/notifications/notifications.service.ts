import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RequestWidhUser, UserKey } from 'src/common/interfaces';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UserService } from 'src/user/user.service';
import { Notification } from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(REQUEST) private request: RequestWidhUser,

    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}
  async create(user: string) {
    return await this.notificationModel.create({ user });
  }

  async update(updateNotificationDto: UpdateNotificationDto) {
    const { email: user } = this.request.user;
    return await this.notificationModel.findOneAndUpdate(
      { user },
      updateNotificationDto,
      { new: true },
    );
  }

  async findOne(): Promise<Notification> {
    const { email: user } = this.request.user;
    const exists = await this.notificationModel.findOne({ user });

    if (!exists) return await this.create(user);
    return exists;
  }
}
