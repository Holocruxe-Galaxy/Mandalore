import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class WsGuard implements CanActivate {
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
      console.log(hola);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
