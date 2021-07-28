import { Injectable } from '@nestjs/common';
import { Command, _cli } from '@squareboat/nest-console';
import { PermissionsService } from 'src/auth/permissions/permissions.service';
import { RolesService } from 'src/auth/roles/roles.service';
import { UsersService as BaseUsersService } from 'src/auth/users/users.service';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
class CliUsersService {
  constructor(
    private usersService: BaseUsersService,
    private permissionsService: PermissionsService,
    private rolesService: RolesService,
  ) {}

  @Command('user:attach', {
    desc: 'Delete user',
    args: {
      user: { req: false },
      permission: { req: false },
      role: { req: false },
    },
  })
  async userAttach(args: { user: string; permission?: string; role?: string }) {
    if (args.user && (args.permission || args.role)) {
      try {
        const user = await this.usersService.findByUsername(args.user);

        if (args.role) {
          const role = await this.rolesService.findByName(args.role);

          return this.usersService.attachRoles(user.uuid, [role]);
        }

        const permission = await this.permissionsService.findByName(
          args.permission,
        );

        return this.usersService.attachPermissions(user.uuid, [permission]);
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          if (e.message.includes('UserEntity')) {
            return _cli.error(`User "${args.user}" not exists`);
          } else if (e.message.includes('PermissionEntity')) {
            return _cli.error(`Permission "${args.permission}" not exists`);
          } else if (e.message.includes('RoleEntity')) {
            return _cli.error(`Role "${args.permission}" not exists`);
          }
        }

        throw e;
      }
    }

    _cli.error('required --user & --permission or --role');
  }

  @Command('user:detach', {
    desc: 'Delete user',
    args: { user: { req: false }, permission: { req: false } },
  })
  async userDetach(args: { user: string; permission: string }) {
    if (args.user && args.permission) {
      try {
        const user = await this.usersService.findByUsername(args.user);

        return this.usersService.detachPermissions(user.uuid, [
          args.permission,
        ]);
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          if (e.message.includes('UserEntity')) {
            return _cli.error(`User "${args.user}" not exists`);
          }
        }

        throw e;
      }
    }

    _cli.error('required --user & --permission');
  }
}

export { CliUsersService as UsersService };
