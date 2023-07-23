import { Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateChatDto } from '../dto/create-chat.dto';
import { plainToClass } from 'class-transformer';
import { validationOptions } from 'src/main';

@Injectable()
export class ParseSocketContent implements PipeTransform {
  async transform(value: unknown) {
    // if (!isValidObjectId(value)) {
    //   throw new BadRequestException(`${value} is not a valid MongoID`);
    // }

    const hola = await validate(plainToClass(CreateChatDto, validationOptions));

    console.log(hola);
    return value;
  }
}
