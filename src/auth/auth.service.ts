import {
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { LoginAuthDto, SignupAuthDto } from './dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
    private readonly httpService: HttpService,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async register(signupAuthDto: SignupAuthDto) {
    try {
      const { data } = await this.httpService.axiosRef.post<Promise<string>>(
        `${this.configService.get<string>('AUTHMICRO-SERVICE')}/register`,
        signupAuthDto,
      );
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const { data } = await this.httpService.axiosRef.post<Promise<string>>(
        `${this.configService.get<string>('AUTHMICRO-SERVICE')}/login`,
        loginAuthDto,
      );
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async stepManager(step: number, dto: any) {
    try {
      return this.userService.stepFollower(step, dto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
