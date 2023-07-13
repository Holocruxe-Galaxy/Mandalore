import { Injectable } from '@nestjs/common';
import { CreateCommonDto } from './dto/create-common.dto';
import { UpdateCommonDto } from './dto/update-common.dto';
import { StepsDto } from 'src/user/form/dto';
import { StepMap } from 'src/user/form/types';

@Injectable()
export class CommonService {
  create(createCommonDto: CreateCommonDto) {
    return 'This action adds a new common';
  }

  findAll() {
    return `This action returns all common`;
  }

  findOne(id: number) {
    return `This action returns a #${id} common`;
  }

  update(id: number, updateCommonDto: UpdateCommonDto) {
    return `This action updates a #${id} common`;
  }

  remove(id: number) {
    return `This action removes a #${id} common`;
  }

  isNotNull<T>(prop: T | null): prop is T {
    return prop !== null;
  }

  isDtoKey(p: string, dto: unknown, stepsDto: StepsDto): dto is StepMap {
    return p in stepsDto;
  }
}
