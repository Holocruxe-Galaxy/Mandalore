import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { FormService } from './form.service';
import { StepsDto } from './dto';

@Controller()
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('step')
  @HttpCode(200)
  async stepForm(@Body() data: StepsDto) {
    return this.formService.stepManager(data);
  }
}
