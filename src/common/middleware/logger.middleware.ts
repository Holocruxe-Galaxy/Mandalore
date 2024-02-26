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
import { RequestWithUser, UserKey } from '../interfaces';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (this.configService.get<string>('LOCAL')) {
        req.user = { userId: 'nataluz@gmail.com' };
        return next();
      }

      const { authorization } = req.headers;
      const { data } = await this.httpService.axiosRef.get<UserKey>(
        `${this.configService.get<string>('AUTHMICRO_SERVICE')}/users/verify`,
        { headers: { authorization } },
      );

      const { userId } = data;
      req.user = { userId };

      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
