import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';

import { Diary } from './schemas';

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name)
    private readonly diaryModel: Model<Diary>,
  ) {}

  create(createDiaryDto: CreateDiaryDto) {
    return 'This action adds a new diary';
  }

  findAll() {
    return `This action returns all diary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diary`;
  }

  update(id: number, updateDiaryDto: UpdateDiaryDto) {
    return `This action updates a #${id} diary`;
  }

  remove(id: number) {
    return `This action removes a #${id} diary`;
  }
}
