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
import { RequestWithUser } from 'src/common/interfaces';
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

    @Inject(REQUEST) private request: RequestWithUser,
  ) {}

  async create(createDiaryDto: CreateDiaryDto): Promise<Diary> {
    const { userId } = this.request.user;

    return await this.diaryModel.create({ ...createDiaryDto, userId });
  }

  async findAll() {
    const { userId } = this.request.user;

    const diaryEntries: DiaryDocument[] = (await this.diaryModel
      .find({
        userId,
        deletedAt: null,
      })
      .sort({ createdAt: -1 })) as DiaryDocument[];

    const responseEntries: DiaryDocument[] = [];

    for (const entry of diaryEntries) {
      const photos = entry.photos.length
        ? await this.imagesService.findOne(entry.photos[0]).then((res) => [res])
        : [];

      responseEntries.push({
        ...entry.toObject(),
        photos,
        createdAt: this.commonService.formatDate(entry.createdAt as Date),
      } as DiaryDocument);
    }

    return responseEntries;
  }

  async findOne(id: ObjectId) {
    const entry: DiaryDocument = await this.diaryModel.findById(id);
    if (!entry?.photos?.length) return entry;

    const photos = await this.imagesService
      .findOne(entry.photos[0])
      .then((res) => [res]);

    return {
      ...entry.toObject(),
      photos,
      createdAt: this.commonService.formatDate(entry.createdAt as Date),
    };
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
    const { userId } = this.request.user;
    const entry = await this.diaryModel.findById(id);
    if (entry.userId !== userId)
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
