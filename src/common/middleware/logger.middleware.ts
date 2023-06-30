import { Inject, Injectable, NestMiddleware, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ClsService, ClsServiceManager } from 'nestjs-cls';
import { Request, Response, NextFunction } from 'express';
import { EmailClsStore } from '../als/store/email-cls.store';

interface UserKey {
  email: string;
}

interface RequestWidhUser extends Request {
  user: UserKey;
}

export function holaPanchito() {
  console.log('HAGO COSAS');
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
    private readonly httpService: HttpService, // private readonly clsService: ClsService<EmailClsStore>,
  ) {}

  async use(req: RequestWidhUser, res: Response, next: NextFunction) {
    console.log('primero');
    const { authorization: Authorization } = req.headers;
    console.log(Authorization);
    // const { data } = await this.httpService.axiosRef.post<Promise<string>>(
    //   `${this.configService.get<string>('AUTHMICRO_SERVICE')}/users/verify`,
    //   null,
    //   { headers: { Authorization } },
    // );
    // this.clsService.run(() => {
    //   this.clsService.set('email', 'emi@unounouno.como');
    //   const hola = this.clsService.get('email');
    //   console.log(hola);
    // });
    req.user = { email: 'hola' };

    console.log('Request...');
    next();
  }
}
