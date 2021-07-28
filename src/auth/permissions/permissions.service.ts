import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
  ) {}

  create(createPermissionDto: CreatePermissionDto) {
    const permission = new PermissionEntity(createPermissionDto);

    return this.permissionRepository.save(permission);
  }

  findAll() {
    return this.permissionRepository.find();
  }

  async findOne(uuid: string) {
    return await this.permissionRepository.findOneOrFail(uuid);
  }

  async findByName(name: string) {
    return await this.permissionRepository.findOneOrFail({ name });
  }

  async update(uuid: string, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.findOne(uuid);

    Object.assign(permission, updatePermissionDto);

    return this.permissionRepository.save(permission);
  }

  async remove(uuid: string): Promise<PermissionEntity> {
    return this.permissionRepository.remove(await this.findOne(uuid));
  }

  async removeByName(name: string): Promise<PermissionEntity> {
    return this.permissionRepository.remove(await this.findByName(name));
  }
}
