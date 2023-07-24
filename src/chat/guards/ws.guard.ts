import { CanActivate, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(@Inject() private readonly authService: AuthService) {}
  canActivate(context: any): boolean | any | Promise<boolean | any> {
    const hola = context.args[0].handshake.headers.authorization;
    try {
      // const decoded = jwt.verify(bearerToken, jwtConstants.secret) as any;
      // return new Promise((resolve, reject) => {
      //   return this.userService
      //     .findByUsername(decoded.username)
      //     .then((user) => {
      //       if (user) {
      //         resolve(user);
      //       } else {
      //         reject(false);
      //       }
      //     });
      // });
      // const hola = user;
      return 'putututuu';
    } catch (error) {
      console.log([error]);
      return [false];
    }
  }
}
