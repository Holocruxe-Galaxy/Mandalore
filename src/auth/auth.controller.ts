import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, SignupAuthDto, StepsDto } from './dto';
import { StepDataKeys } from './types';
import { ParseStep } from './pipes/parse-step.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signupAuthDto: SignupAuthDto) {
    return this.authService.register(signupAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('step/:num')
  async stepForm(
    @Param('num', ParseStep) step: StepDataKeys,
    @Body() data: StepsDto,
  ) {
    return this.authService.stepManager(step, data);
  }
}
