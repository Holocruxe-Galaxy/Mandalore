import { Injectable } from '@nestjs/common';
import { StepsDto } from 'src/user/form/dto';
import { StepMap } from 'src/user/form/types';

@Injectable()
export class CommonService {
  isNotNull<T>(prop: T | null): prop is T {
    return prop !== null;
  }

  isDtoKey(p: string, dto: unknown, stepsDto: StepsDto): dto is StepMap {
    return p in stepsDto;
  }
}
