import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, SignupAuthDto } from './dto';

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
  stepForm(@Param('num') step: number, @Body() data: string) {
    return this.authService.stepManager(step, data);
  }
}
