import { Controller, Post, Body, HttpCode, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FormService } from './form.service';
import { StepsDto } from './dto';
import { UpdateStepsDto } from './dto/update-steps.dto';

@ApiTags('User - Form')
@Controller()
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('step')
  @HttpCode(200)
  async stepForm(@Body() data: StepsDto) {
    return this.formService.stepManager(data);
  }

  @Patch('step')
  async updateStepForm(@Body() data: UpdateStepsDto) {
    return this.formService.stepManager(data);
  }
}
