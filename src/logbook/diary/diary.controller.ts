import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';

import { ParseObjectIdPipe } from 'src/common/pipes';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  create(@Body() createDiaryDto: CreateDiaryDto) {
    return this.diaryService.create(createDiaryDto);
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('photos'))
  uploadPicture(
    @UploadedFile() photos: Express.Multer.File,
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ) {
    this.diaryService.addPhotosToDiaryEntry(id, photos);
  }

  @Get()
  findAll() {
    return this.diaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diaryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() updateDiaryDto: UpdateDiaryDto,
  ) {
    return this.diaryService.update(id, updateDiaryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.diaryService.remove(id);
  }
}
