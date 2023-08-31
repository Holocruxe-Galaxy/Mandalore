import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Diary, DiaryDocument } from './schemas';

import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { RequestWidhUser } from 'src/common/interfaces';
import { CommonService } from 'src/common/common.service';
import { ImagesService } from 'src/common/images/images.service';

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name)
    private readonly diaryModel: Model<Diary>,

    @Inject(CommonService)
    private commonService: CommonService,

    @Inject(ImagesService)
    private imagesService: ImagesService,

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
      await this.checkIfAuthorizedUser(id);
      return await this.diaryModel.findByIdAndUpdate(id, updateDiaryDto, {
        new: true,
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: ObjectId) {
    try {
      await this.checkIfAuthorizedUser(id);

      await this.diaryModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true },
      );

      return 'Entry deleted successfully.';
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async addPhotosToDiaryEntry(id: ObjectId, photo: Express.Multer.File) {
    try {
      const entry = await this.checkIfAuthorizedUser(id);
      const photos = await this.imagesService.uploadManager(photo, id);

      await entry.updateOne({ $push: { photos } });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private async checkIfAuthorizedUser(id: ObjectId) {
    const { email: user } = this.request.user;
    const entry = await this.diaryModel.findById(id);
    if (entry.user !== user)
      throw new UnauthorizedException(
        'The entry you are trying to modify is not yours.',
      );

    return entry;
  }

  private handleExceptions(error: any): never {
    if (error.name === 'UnauthorizedException')
      throw new UnauthorizedException(error.message);
    throw new BadRequestException(error.message);
  }
}
