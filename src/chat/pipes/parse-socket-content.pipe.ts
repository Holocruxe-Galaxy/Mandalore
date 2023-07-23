import { Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { Message } from '../dto/message.dto';
import { plainToClass } from 'class-transformer';
import { validationOptions } from 'src/main';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ParseSocketContent implements PipeTransform {
  async transform(value: unknown) {
    const errors = await validate(
      plainToClass(Message, value),
      validationOptions,
    );

    if (errors.length) {
      const response = errors.map(
        (error) => Object.values(error.constraints)[0],
      );

      throw new WsException(response);
    }

    return value;
  }
}
