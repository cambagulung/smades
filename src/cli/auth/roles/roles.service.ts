import { Injectable } from '@nestjs/common';
import { Command, _cli } from '@squareboat/nest-console';
import { CreateRoleDto } from 'src/auth/roles/dto/create-role.dto';
import { RolesService as BaseRolesService } from 'src/auth/roles/roles.service';
import { QueryFailedError } from 'typeorm';

@Injectable()
class LocalRolesService {
  constructor(private rolesService: BaseRolesService) {}

  @Command('role:create', {
    desc: 'Create role',
    args: { name: { req: false } },
  })
  async roleCreate({ name }: CreateRoleDto) {
    if (name) {
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
}

export { LocalRolesService as RolesService };
