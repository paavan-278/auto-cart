import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class TokenDependency {
   getCurrentUser(req: Request): string {
    const header = req.headers.authorization;
    if (!header) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [type, token] = header.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    return token;
  }

  getUserId(req: Request): string {
    const user = req['user'];

    if (!user || !user.id) {
      throw new UnauthorizedException('User not authenticated');
    }

    return user.id;
  }
}
