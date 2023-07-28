import { Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { validationOptions } from 'src/main';

import { CreateMessageDto } from '../dto';

@Injectable()
export class ParseSocketContent implements PipeTransform {
  async transform(value: unknown) {
    const jsonValue = typeof value === 'string' ? JSON.parse(value) : value;

    const errors = await validate(
      plainToClass(CreateMessageDto, jsonValue),
      validationOptions,
    );

    if (errors.length) {
      const response = errors.map(
        (error) => Object.values(error.constraints)[0],
      );

      throw new WsException(response);
    }

    return jsonValue;
  }
}
