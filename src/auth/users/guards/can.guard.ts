import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../users.service';

@Injectable()
export class CanGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredAbility = this.reflector.getAllAndOverride<string>(
      'ability',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredAbility) return true;

    const { user }: { user: UserEntity } = context.switchToHttp().getRequest();

    return await this.usersService.userCan(user.uuid, requiredAbility);
  }
}
