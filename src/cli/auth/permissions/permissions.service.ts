import { Injectable } from '@nestjs/common';
import { Command, _cli } from '@squareboat/nest-console';
import { CreatePermissionDto } from 'src/auth/permissions/dto/create-permission.dto';
import { PermissionsService as BasePermissionsService } from 'src/auth/permissions/permissions.service';
import { QueryFailedError } from 'typeorm';

@Injectable()
class LocalPermissionsService {
  constructor(private permissionsService: BasePermissionsService) {}

  @Command('permission:create', {
    desc: 'Create permission',
    args: { name: { req: false } },
  })
  async permissionCreate({ name }: CreatePermissionDto) {
    if (name) {
      try {
        await this.permissionsService.create({ name });

        return _cli.info(`Permission "${name}" created.`);
      } catch (e) {
        if (e instanceof QueryFailedError) {
          return _cli.error(`Permission "${name} allready exists"`);
        }

        throw e;
      }
    }

    _cli.error('required --name');
  }

  @Command('permission:delet', {
    desc: 'Create permission',
    args: { name: { req: false } },
  })
  async permissionDelete({ name }: CreatePermissionDto) {
    if (name) {
      try {
        await this.permissionsService.create({ name });

        return _cli.info(`Permission "${name}" created.`);
      } catch (e) {
        if (e instanceof QueryFailedError) {
          return _cli.error(`Permission "${name} allready exists"`);
        }

        throw e;
      }
    }

    _cli.error('required --name');
  }
}

export { LocalPermissionsService as PermissionsService };
