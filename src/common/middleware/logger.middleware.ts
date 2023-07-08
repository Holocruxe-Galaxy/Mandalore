import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Response, NextFunction } from 'express';
import { RequestWidhUser } from '../interfaces';
import { UserResponseKey } from '../interfaces/user-key.interface';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async use(req: RequestWidhUser, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      const { data } = await this.httpService.axiosRef.post<UserResponseKey>(
        `${this.configService.get<string>('AUTHMICRO_SERVICE')}/users/verify`,
        null,
        { headers: { authorization: `Bearer ${authorization}` } },
      );

      const email = data.userMail;
      req.user = { email };

      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
