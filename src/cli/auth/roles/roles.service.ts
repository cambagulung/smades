import { Injectable } from '@nestjs/common';
import { Command, _cli } from '@squareboat/nest-console';
import { PermissionsService } from 'src/auth/permissions/permissions.service';
import { CreateRoleDto } from 'src/auth/roles/dto/create-role.dto';
import { RolesService as BaseRolesService } from 'src/auth/roles/roles.service';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Injectable()
class CliRolesService {
  constructor(
    private readonly rolesService: BaseRolesService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @Command('role:create', {
    desc: 'Create role',
    args: { name: { req: true } },
  })
  async roleCreate({ name }: CreateRoleDto) {
    if (typeof name == 'string') {
      try {
        await this.rolesService.create({ name });

        return _cli.info(`Role "${name}" created.`);
      } catch (e) {
        if (e instanceof QueryFailedError) {
          return _cli.error(`Role "${name} allready exists"`);
        }

        throw e;
      }
    }

    _cli.error('required --name');
  }

  @Command('role:delete', {
    desc: 'Delete permission',
    args: { name: { req: true } },
  })
  async roleDelete({ name }: { name: string }) {
    if (typeof name == 'string') {
      try {
        await this.rolesService.removeByName(name);

        return _cli.info(`Role "${name}" deleted.`);
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          return _cli.error(`Role "${name}" not exists`);
        }

        throw e;
      }
    }

    _cli.error('required --name');
  }

  @Command('role:attach', {
    desc: 'Delete role',
    args: { role: { req: true }, permission: { req: true } },
  })
  async roleAttach(args: { role: string; permission: string }) {
    if (typeof args.role == 'string' && typeof args.permission == 'string') {
      try {
        const role = await this.rolesService.findByName(args.role, {
          relations: ['permissions'],
        });

        const permission = await this.permissionsService.findByName(
          args.permission,
        );

        return this.rolesService.attachPermissions(role.uuid, [permission]);
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          if (e.message.includes('RoleEntity')) {
            return _cli.error(`Role "${args.role}" not exists`);
          } else if (e.message.includes('PermissionEntity')) {
            return _cli.error(`Permission "${args.permission}" not exists`);
          }
        }

        throw e;
      }
    }

    _cli.error('required --role & --permission');
  }

  @Command('role:detach', {
    desc: 'Delete role',
    args: { role: { req: true }, permission: { req: true } },
  })
  async roleDetach(args: { role: string; permission: string }) {
    if (typeof args.role == 'string' && typeof args.permission == 'string') {
      try {
        const role = await this.rolesService.findByName(args.role, {
          relations: ['permissions'],
        });

        return this.rolesService.detachPermissions(role.uuid, [
          args.permission,
        ]);
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          if (e.message.includes('RoleEntity')) {
            return _cli.error(`Role "${args.role}" not exists`);
          }
        }

        throw e;
      }
    }

    _cli.error('required --role & --permission');
  }
}

export { CliRolesService as RolesService };
