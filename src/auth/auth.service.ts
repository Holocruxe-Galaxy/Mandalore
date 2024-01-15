import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { compareSync, hashSync } from 'bcrypt';
import { LoginDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserKey, UserResponseKey } from 'src/common/interfaces';
import { Account } from './schemas/account.schema';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
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

  async create(createAuthDto: LoginDto) {
    try {
      const { password, ...userData } = createAuthDto;

      await this.accountModel.create({
        ...userData,
        password: hashSync(password, 12),
      });
    } catch (error) {
      this.handleExceptions(error, 'A user');
    }
  }

  async login({ username, password }: LoginDto): Promise<any> {
    const userWithPassword = await this.accountModel.findOne({ username });

    if (!userWithPassword)
      throw new BadRequestException('The username introduced is incorrect.');
    if (!compareSync(password, userWithPassword.password))
      throw new BadRequestException('The password introduced is incorrect.');

    const user = userWithPassword.toObject();
    const accessToken = this.setJwtToken({ id: user._id, role: user.role });
    delete user.password;

    return { userData: user, accessToken };
  }

  async validate(token: any) {
    try {
      this.jwtService.verify(token, this.configService.get('JWT_SECRET'));
      const { id, role }: any = this.jwtService.decode(token);

      return { userData: { id, role } };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const { id, role }: any = this.jwtService.decode(token);

        const userWithPassword = await this.accountModel.findById(id);
        if (userWithPassword) {
          const user = userWithPassword.toObject();
          delete user.password;

          const accessToken = this.setJwtToken({ id, role });
          return { userData: user, token: accessToken };
        }
        throw new UnauthorizedException('El usuario no es válido.');
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  createCookie(tokenData: string): string {
    const expiresIn = 60 * 60 * 24;

    return `Authorization=${tokenData}; max-age=${expiresIn}; HttpOnly; Path=/; Secure; SameSite=None;`;
  }

  private setJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: 60 * 60 * 24 * 365,
    });
  }

  private handleExceptions(error: any, entity?: string): never {
    this.lowerlevelExceptionHandler(error);

    console.error(error.message);

    if (error.code === 11000) {
      throw new BadRequestException({
        message: `${entity || 'An entity'} with that ${
          Object.keys(error.keyPattern)[0]
        } already exists in the database ${JSON.stringify(error.keyValue)}`,
      });
    }

    throw new InternalServerErrorException(
      `Something went wrong. ${error.message}`,
    );
  }

  private lowerlevelExceptionHandler(error: any): void {
    if (error.name === 'BadRequestException')
      throw new BadRequestException(error.message);
    if (error.name === 'InternalServerErrorException')
      throw new InternalServerErrorException(error.message);
    if (error.name === 'NotFoundException')
      throw new NotFoundException(error.message);
    if (error.name === 'UnauthorizedException')
      throw new UnauthorizedException(error.message);
  }
}
