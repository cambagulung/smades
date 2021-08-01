import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { Brackets, FindOneOptions, Repository } from 'typeorm';
import { PermissionEntity } from '../permissions/entities/permission.entity';
import { RoleEntity } from '../roles/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const pass = hashSync(createUserDto.password, genSaltSync(10));
    const user = new UserEntity({ ...createUserDto, password: pass });

    return this.usersRepository.save(user);
  }

  take({ take, page }: { take: number; page: number }): Promise<UserEntity[]> {
    const skip = page * take - take;

    return this.usersRepository.find({ take, skip });
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(
    uuid: string,
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail(uuid, options);
  }

  findOneByOptions(options?: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail(options);
  }

  findByUsername(
    username: string,
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail({ username }, options);
  }

  findByEmail(
    email: string,
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail({ email }, options);
  }

  async update(
    user: string | UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    if (typeof user == 'string') {
      user = await this.findOne(user);
    }

    if (updateUserDto.password) {
      const password = hashSync(updateUserDto.password, genSaltSync(10));

      Object.assign(updateUserDto, { password });
    }

    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(uuid: string): Promise<UserEntity> {
    return this.usersRepository.remove(await this.findOne(uuid));
  }

  async attachPermissions(uuid: string, permissions: PermissionEntity[]) {
    const user = await this.findOne(uuid, {
      relations: ['permissions', 'roles'],
    });

    return this.update(uuid, {
      permissions: [...user.permissions, ...permissions],
    });
  }

  async detachPermissions(uuid: string, permissions: string[]) {
    const user = await this.findOne(uuid, { relations: ['permissions'] });
    const deta = user.permissions.filter((e) => !permissions.includes(e.name));

    return this.update(user, { permissions: deta });
  }

  async attachRoles(uuid: string, roles: RoleEntity[]) {
    const user = await this.findOne(uuid, { relations: ['roles'] });

    return this.update(uuid, {
      roles: [...user.roles, ...roles],
    });
  }

  async detachRoles(uuid: string, roles: string[]) {
    const user = await this.findOne(uuid, { relations: ['roles'] });
    const deta = user.roles.filter((e) => !roles.includes(e.name));

    return this.update(user, { roles: deta });
  }

  async hasPermissions(uuid: string, ...permissions: string[]) {
    const count = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .leftJoin('role.permissions', 'rolePermission')
      .leftJoin('user.permissions', 'permission')
      .where('user.uuid = :uuid')
      .andWhere(
        new Brackets((qb) => {
          qb.where('permission.name IN (:permissions)');
          qb.orWhere('rolePermission.name IN (:permissions)');
        }),
      )

      .setParameters({ uuid, permissions })
      .getCount();

    return count > 0;
  }

  async hasRoles(uuid: string, ...roles: string[]) {
    const count = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .where('user.uuid = :uuid')
      .andWhere('role.name IN (:roles)')
      .setParameters({ uuid, roles })
      .getCount();

    return count > 0;
  }

  async userCan(uuid: string, ...permissions: string[]) {
    const isSuper = await this.hasRoles(uuid, 'super');

    return isSuper || (await this.hasPermissions(uuid, ...permissions));
  }
}
