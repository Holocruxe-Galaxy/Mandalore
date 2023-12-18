import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';

import { ImagesService } from 'src/common/images/images.service';
import { ChatGateway } from './chat.gateway';

type IdParam = { id: string };

@Controller('chat')
export class ChatController {
  constructor(
    @Inject(ChatGateway)
    private chatGateway: ChatGateway,
    @Inject(ImagesService)
    private imagesService: ImagesService,
  ) {}

  @UseInterceptors(FileInterceptor('audio'))
  @Post('/:id')
  async postAudio(
    @Param() id: IdParam,
    @UploadedFile() audio: Express.Multer.File,
  ) {
    const data = await this.imagesService.uploadManager(
      audio,
      id.id as unknown as ObjectId,
    );

    await this.chatGateway.sendAudio(id.id, data);
    return 'hi';
  }
}
