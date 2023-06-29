import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas';
import { ContactInfoService, PersonalService } from './services';

import { StepDataValues } from 'src/auth/types';
import { StepsDto } from 'src/auth/dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<typeof User>,

    @Inject(forwardRef(() => ContactInfoService))
    private contactInfoService: ContactInfoService,
    @Inject(forwardRef(() => PersonalService))
    private personalService: PersonalService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    console.log(user);
    return 'The user has been created successfully';
  }

  async stepFollower(service: StepDataValues, dto: StepsDto) {
    try {
      const dtoData = dto[service.name] as any;
      const serviceInstance = this[service.stepService];
      return await serviceInstance.create(dtoData);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
