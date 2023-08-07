import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { organizerDtoList } from '../types';

@Injectable()
export class ParseParamPipe implements PipeTransform {
  transform(value: string) {
    if (!organizerDtoList.includes(value)) {
      throw new BadRequestException(`${value} is not a valid param`);
    }

    return value;
  }
}
