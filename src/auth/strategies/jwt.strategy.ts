import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { User } from 'src/user/schemas/user.schema';
import { JwtPayload } from '../interfaces';
import { Account } from '../schemas/account.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.headers?.Authorization;
        },
      ]),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    const user: User = await this.accountModel.findOne({ id });

    if (!user) throw new UnauthorizedException('Invalid token.');

    return user;
  }
}
