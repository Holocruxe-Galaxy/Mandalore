import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isStepKey } from '../types';

@Injectable()
export class ParseStep implements PipeTransform {
  transform(value: string) {
    if (!isStepKey(value)) {
      throw new BadRequestException(`${value} is not a valid step.`);
    }
    return value;
  }
}
