import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Diary, DiaryDocument } from './schemas';

import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { RequestWidhUser } from 'src/common/interfaces';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name)
    private readonly diaryModel: Model<Diary>,

    @Inject(CommonService)
    private commonService: CommonService,

    @Inject(REQUEST) private request: RequestWidhUser,
  ) {}

  async create(createDiaryDto: CreateDiaryDto): Promise<Diary> {
    const { email: user } = this.request.user;

    return await this.diaryModel.create({ ...createDiaryDto, user });
  }

  async findAll() {
    const { email: user } = this.request.user;

    const diaryEntries: DiaryDocument[] = (await this.diaryModel
      .find({
        user,
        deletedAt: null,
      })
      .sort({ createdAt: -1 })) as DiaryDocument[];

    return diaryEntries.map((entry) => {
      return {
        ...entry.toObject(),
        createdAt: this.commonService.formatDate(entry.createdAt as Date),
      };
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} diary`;
  }

  async update(id: ObjectId, updateDiaryDto: UpdateDiaryDto) {
    try {
      return await this.diaryModel.findByIdAndUpdate(id, updateDiaryDto, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: ObjectId) {
    try {
      await this.diaryModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true },
      );

      return 'Entry deleted successfully.';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
