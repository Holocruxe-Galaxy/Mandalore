import {
  Inject,
  Injectable,
  forwardRef,
  Scope,
  InternalServerErrorException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas';
import { CommonService } from 'src/common/common.service';

import { RequestWidhUser } from 'src/common/interfaces';
import { Step } from './form/types';
import { Complete, Pending, Select } from './interfaces';
import { StatusType, select } from './types';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
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

  // async stepFollower(step: StepType, dto: DtoType): Promise<User> {
  async stepFollower(step: Step): Promise<User> {
    try {
      // const data =
      //   step === 'contactInfo'
      //     ? await this.contactInfoService.create(dto as CreateContactInfoDto)
      //     : step === 'location'
      //     ? await this.locationService.create(dto as CreateLocationDto)
      //     : step === 'personal'
      //     ? await this.personalService.create(dto as CreatePersonalDto)
      //     : undefined;

      return this.addFormProp(step);
      // if (data) return this.addFormProp(step, data);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  private async addFormProp(data: Step) {
    const email = this.request.user;
    const prop = Object.keys(data)[0];
    const status = prop === 'location' ? 'COMPLETE' : null;

    if (status !== null) {
      return await this.userModel.findOneAndUpdate(
        email,
        {
          [prop]: data[prop],
          $inc: { step: +1 },
          status,
        },
        { new: true },
      );
    }

    return await this.userModel.findOneAndUpdate(
      email,
      {
        [prop]: data[prop],
        $inc: { step: +1 },
      },
      { new: true },
    );
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
      throw new InternalServerErrorException(error.message);
    }
  }

  private dataPicker({ role, status, ...user }: User): Pending | Complete {
    if (status === 'PENDING') return { role, status, step: user.step };
    else if (status === 'COMPLETE') {
      const { country } = user.location[0];

      return { role, status, country };
    }
  }

  // async update(service: StepDataValues, updateUserDto: StepsDto) {
  //   const dtoData = service.name;
  //   const email = this.request.user;
  //   console.log({ [dtoData]: updateUserDto });
  //   return await this.userModel.find(email, { [dtoData]: updateUserDto });
  //   // return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
