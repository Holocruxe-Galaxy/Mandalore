import {
  Inject,
  Injectable,
  forwardRef,
  Scope,
  BadRequestException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas';
import { CommonService } from 'src/common/common.service';

import { RequestWidhUser, UserKey } from 'src/common/interfaces';
import { Complete, Pending, Select } from './interfaces';
import { StatusType, UserProperty, select } from './types';
import { StepMap } from './form/types';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,

    @Inject(REQUEST) private request: RequestWidhUser,
  ) {}

  async create() {
    const email = this.request.user;
    return await this.userModel.create(email);
  }

  // It's called from FormService. It recieves a single user property
  // and if it's the last one, it sets the status as 'COMPLETE'.
  async stepFollower(step: StepMap): Promise<User> {
    try {
      const prop = Object.keys(step)[0];
      let status: StatusType;

      const TEST = this.configService.get('TESTING');

      if (TEST) status = prop === 'personal' ? 'COMPLETE' : null;
      else status = prop === 'generalInterests' ? 'COMPLETE' : null;

      const data: UserProperty = this.addCompleteStatus(step, status);

      return this.addFormStepToUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  private async addFormStepToUser(data: UserProperty) {
    const user = this.request.user;

    const response = await this.userModel.findOneAndUpdate(
      user,
      {
        ...data,
        $inc: { step: +1 },
      },
      { new: true },
    );

    if (!response)
      throw new BadRequestException(
        `The user with the email ${user.email} does not exist in core database.`,
      );
    return response;
  }

  // If the user status should be changed to 'COMPLETE',
  // it adds said property to the object that will update the user.
  private addCompleteStatus(
    prop: StepMap,
    status: StatusType | null,
  ): UserProperty {
    if (status === null) return prop;
    return { ...prop, status };
  }

  async findAll(): Promise<Select[]> {
    return await this.userModel.find().select(select);
  }

  async findOne() {
    try {
      const email = this.request.user;
      const user: User = await this.userModel.findOne(email);

      return this.dataPicker(user.toObject());
    } catch (error) {
      const user = await this.create();
      return this.dataPicker(user.toObject());
    }
  }

  mockUserData() {
    return {
      userName: 'Panchito',
      birthdate: '02/29/2000',
      province: 'Buenos Aires',
      country: 'Argentina',
      telephone: 'AR+541112345678',
      email: 'email@mail.com',
      language: 'Spanish',
      state: 'COMPLETE',
    };
  }

  // It picks the data requested in findOne()
  // its result depends on whether the user completed the form or not.
  private dataPicker({ status, ...user }: User): Pending | Complete {
    if (status === 'PENDING') return { status, step: user.step };
    else if (status === 'COMPLETE') {
      // const { country } = user.location[0];

      return { status };
    }
  }

  async update(email: UserKey, data: object) {
    await this.userModel.findOneAndUpdate(email, data);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
