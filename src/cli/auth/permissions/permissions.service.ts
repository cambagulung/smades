import { Injectable } from '@nestjs/common';
import { Command, _cli } from '@squareboat/nest-console';
import { CreatePermissionDto } from 'src/auth/permissions/dto/create-permission.dto';
import { PermissionsService as BasePermissionsService } from 'src/auth/permissions/permissions.service';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Injectable()
class CliPermissionsService {
  constructor(private permissionsService: BasePermissionsService) {}

  @Command('permission:create', {
    desc: 'Create permission',
    args: { name: { req: true } },
  })
  async permissionCreate({ name }: CreatePermissionDto) {
    if (typeof name == 'string') {
      try {
        await this.permissionsService.create({ name });

        return _cli.info(`Permission "${name}" created.`);
      } catch (e) {
        if (e instanceof QueryFailedError) {
          return _cli.error(`Permission "${name}" allready exists`);
        }

        throw e;
      }
    }

    _cli.error('required --name');
  }

  @Command('permission:delete', {
    desc: 'Delete permission',
    args: { name: { req: true } },
  })
  async permissionDelete({ name }: CreatePermissionDto) {
    if (typeof name == 'string') {
      try {
        await this.permissionsService.removeByName(name);

        return _cli.info(`Permission "${name}" deleted.`);
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          return _cli.error(`Permission "${name}" not exists`);
        }

        throw e;
      }
    }

    _cli.error('required --name');
  }
}

export { CliPermissionsService as PermissionsService };
