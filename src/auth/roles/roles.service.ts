import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { PermissionEntity } from '../permissions/entities/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(new RoleEntity(createRoleDto));
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(uuid: string, options?: FindOneOptions<RoleEntity>) {
    return this.roleRepository.findOneOrFail(uuid, options);
  }

  findByName(name: string, options?: FindOneOptions<RoleEntity>) {
    return this.roleRepository.findOneOrFail({ name }, options);
  }

  async update(
    role: string | RoleEntity,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleEntity> {
    if (typeof role == 'string') {
      role = await this.findOne(role);
    }

    return this.roleRepository.save({ ...role, ...updateRoleDto });
  }

  async remove(uuid: string): Promise<RoleEntity> {
    return this.roleRepository.remove(await this.findOne(uuid));
  }

  async removeByName(name: string): Promise<RoleEntity> {
    return this.roleRepository.remove(await this.findByName(name));
  }

  async attachPermissions(uuid: string, permissions: PermissionEntity[]) {
    const role = await this.findOne(uuid, { relations: ['permissions'] });

    return this.update(uuid, {
      permissions: [...role.permissions, ...permissions],
    });
  }

  async detachPermissions(uuid: string, permissions: string[]) {
    const role = await this.findOne(uuid, { relations: ['permissions'] });
    const deta = role.permissions.filter((e) => !permissions.includes(e.name));

    return this.update(role, { permissions: deta });
  }
}
