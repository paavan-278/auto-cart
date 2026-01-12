import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenDependency {
  getCurrentUser(req: any): string {
    const auth = req.headers?.authorization;
    if (!auth) return '';

    return auth.split(' ')[1];
  }
}
