import { Controller, Post, Body } from '@nestjs/common';
import { FormService } from './form.service';
import { StepType } from './types';
import { StepsDto } from './dto';

@Controller()
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('step')
  async stepForm(@Body() data: StepsDto) {
    return this.formService.stepManager(data);
  }
}
