import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserKey, UserResponseKey } from 'src/common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  async isUser(token: string): Promise<UserKey> {
    try {
      if (this.configService.get<string>('LOCAL')) {
        return { email: 'nataluz@gmail.com' };
      }
      const { data } = await this.httpService.axiosRef.get<UserResponseKey>(
        `${this.configService.get<string>('AUTHMICRO_SERVICE')}/users/verify`,
        { headers: { authorization: token } },
      );

      const email = data.userMail;
      return { email };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
