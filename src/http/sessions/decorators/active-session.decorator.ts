import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionEntity } from '../../../auth/sessions/entities/session.entity';

export const ActiveSession = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request: { activeSession: SessionEntity } = context
      .switchToHttp()
      .getRequest();

    if (request.activeSession) {
      return (data && request.activeSession[data]) || request.activeSession;
    }

    throw new UnauthorizedException();
  },
);
