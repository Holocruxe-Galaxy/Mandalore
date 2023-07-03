import { Inject, Injectable, forwardRef, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';

import { User } from './schemas';
import { ContactInfoService, PersonalService } from './services';

import { RequestWidhUser } from 'src/common/interfaces';
import { DtoType, StepType } from './form/types';
import { CreateContactInfoDto, CreatePersonalDto } from './dto';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @Inject(forwardRef(() => ContactInfoService))
    private contactInfoService: ContactInfoService,
    @Inject(forwardRef(() => PersonalService))
    private personalService: PersonalService,
    @Inject(REQUEST) private request: RequestWidhUser,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.userModel.create(createUserDto);

    return 'The user has been created successfully';
  }

  async stepFollower(step: StepType, dto: DtoType): Promise<User> {
    try {
      const data =
        step === 'contactInfo'
          ? await this.contactInfoService.create(dto as CreateContactInfoDto)
          : step === 'personal'
          ? await this.personalService.create(dto as CreatePersonalDto)
          : undefined;

      if (data) return this.addFormProp(step, data);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async addFormProp(prop: StepType, dto: ObjectId) {
    const email = this.request.user;

    return await this.userModel.findOneAndUpdate(
      email,
      {
        [prop]: dto,
        $inc: { step: +1 },
      },
      { new: true },
    );
  }

  async findAll() {
    return await this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
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
