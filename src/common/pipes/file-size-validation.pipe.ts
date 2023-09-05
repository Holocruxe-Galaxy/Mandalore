import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value) throw new BadRequestException('No file was sent.');

    const oneKb = 1000;
    return value?.size < oneKb;
  }
}
