import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { StepsDto } from './dto/steps.dto';

import { UserService } from '../user.service';
import { CommonService } from 'src/common/common.service';

import { User } from '../schemas';

@Injectable()
export class FormService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,

    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
  ) {}

  async stepManager(stepsDto: StepsDto) {
    const steps: Promise<User>[] = [];

    for (const step in stepsDto) {
      const dto = { [step]: stepsDto[step] };
      if (this.commonService.isDtoKey<StepsDto>(step, dto, stepsDto))
        steps.push(this.userService.stepFollower(dto));
    }
    const results = await Promise.all(steps);

    return results.pop();
  }

  async updateUserData(stepsDto: StepsDto) {
    const steps: Promise<User>[] = [];

    for (const step in stepsDto) {
      const dto = { [step]: stepsDto[step] };
      if (this.commonService.isDtoKey<StepsDto>(step, dto, stepsDto))
        steps.push(this.userService.stepFollower(dto));
    }
    const results = await Promise.all(steps);

    return results.pop();
  }
}
