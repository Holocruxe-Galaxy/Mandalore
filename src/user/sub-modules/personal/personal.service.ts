import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { Personal } from './schemas';

@Injectable()
export class PersonalService {
  constructor(
    @InjectModel(Personal.name)
    private readonly personalModel: Model<Personal>,
  ) {}
  async create(createPersonalDto: CreatePersonalDto): Promise<ObjectId> {
    const { _id } = await this.personalModel.create(createPersonalDto);

    return _id;
  }

  findAll() {
    return `This action returns all personal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personal`;
  }

  update(id: number, updatePersonalDto: UpdatePersonalDto) {
    return `This action updates a #${id} personal`;
  }

  remove(id: number) {
    return `This action removes a #${id} personal`;
  }
}
