import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserResponseKey } from 'src/common/interfaces/user-key.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async isUser(token: string) {
    if (this.configService.get<string>('LOCAL')) {
      return { email: 'nataluz@gmail.com' };
    }
    const { data } = await this.httpService.axiosRef.get<UserResponseKey>(
      `${this.configService.get<string>('AUTHMICRO_SERVICE')}/users/verify`,
      { headers: { authorization: token } },
    );

    const email = data.userMail;
    return { email };
  }
}
