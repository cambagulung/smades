import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

export const User = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request: { user: UserDto } = context.switchToHttp().getRequest();

    if (request.user) {
      return (data && request.user[data]) || request.user;
    }

    throw new UnauthorizedException();
  },
);
