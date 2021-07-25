import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findOne(uuid: string) {
    return await this.roleRepository.findOneOrFail(uuid);
  }

  async findByName(name: string) {
    return await this.roleRepository.findOneOrFail({ name });
  }

  async update(uuid: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(uuid);

    Object.assign(role, updateRoleDto);

    return this.roleRepository.save(role);
  }

  async remove(uuid: string): Promise<RoleEntity> {
    const role = await this.findOne(uuid);

    return this.roleRepository.remove(role);
  }
}
