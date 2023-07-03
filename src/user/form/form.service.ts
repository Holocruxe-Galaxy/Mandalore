import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { StepsDto } from './dto/steps.dto';

import { UserService } from '../user.service';
import { ContactInfoService, PersonalService } from '../services';
import { StepType } from './types';
import { User } from '../schemas';

@Injectable()
export class FormService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async stepManager(stepsDto: StepsDto) {
    const steps: Promise<User>[] = [];

    for (const step in stepsDto) {
      steps.push(
        this.userService.stepFollower(step as StepType, stepsDto[step]),
      );
    }
    const results = await Promise.all(steps);

    return results.pop();
  }
}
