import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { UserKey } from 'src/common/interfaces';

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
        return { userId: 'nataluz@gmail.com' };
      }
      const { data } = await this.httpService.axiosRef.get<UserKey>(
        `${this.configService.get<string>('AUTHMICRO_SERVICE')}/users/verify`,
        { headers: { authorization: token } },
      );

      const { userId } = data;
      return { userId };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
