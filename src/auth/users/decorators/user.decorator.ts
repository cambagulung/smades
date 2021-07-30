import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

export const User = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request: { user: UserEntity } = context.switchToHttp().getRequest();

    if (request.user) {
      return (data && request.user[data]) || request.user;
    }

    throw new UnauthorizedException();
  },
);
