import { Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { validationOptions } from 'src/main';

import { Message } from '../dto/message.dto';

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
