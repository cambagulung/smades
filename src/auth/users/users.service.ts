import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { Brackets, FindOneOptions, Repository } from 'typeorm';
import { PermissionEntity } from '../permissions/entities/permission.entity';
import { RoleEntity } from '../roles/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const pass = hashSync(createUserDto.password, genSaltSync(10));
    const user = await this.usersRepository.save(
      new UserEntity({ ...createUserDto, password: pass }),
    );

    return new UserDto(user);
  }

  async take({
    take,
    page,
  }: {
    take: number;
    page: number;
  }): Promise<UserDto[]> {
    const skip = page * take - take;
    const users = await this.usersRepository.find({ take, skip });

    return users.map((user) => new UserDto(user));
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();

    return users.map((user) => new UserDto(user));
  }

  async findOne(
    uuid: string,
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserDto> {
    const user = await this.usersRepository.findOneOrFail(uuid, options);

    return new UserDto(user);
  }

  async findOneByOptions(
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserDto> {
    const user = await this.usersRepository.findOneOrFail(options);

    return new UserDto(user);
  }

  async findByUsername(
    username: string,
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserDto> {
    const user = await this.usersRepository.findOneOrFail(
      { username },
      options,
    );
    return new UserDto(user);
  }

  findByEmail(
    email: string,
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail({ email }, options);
  }

  async update(uuid: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOneOrFail(uuid);

    if (updateUserDto.password) {
      const password = hashSync(updateUserDto.password, genSaltSync(10));

      Object.assign(updateUserDto, { password });
    }

    return this.usersRepository.save(user).then((user) => new UserDto(user));
  }

  async remove(uuid: string): Promise<UserDto> {
    const user = await this.usersRepository.findOneOrFail(uuid);

    return this.usersRepository.remove(user).then((user) => new UserDto(user));
  }

  async attachPermissions(uuid: string, permissions: PermissionEntity[]) {
    const user = await this.usersRepository.findOneOrFail(uuid, {
      relations: ['permissions'],
    });

    return this.update(uuid, {
      permissions: [...user.permissions, ...permissions],
    });
  }

  async detachPermissions(uuid: string, permissions: string[]) {
    const user = await this.usersRepository.findOneOrFail(uuid, {
      relations: ['permissions'],
    });

    return this.update(uuid, {
      permissions: user.permissions.filter(
        (e) => !permissions.includes(e.name),
      ),
    });
  }

  async attachRoles(uuid: string, roles: RoleEntity[]) {
    const user = await this.usersRepository.findOneOrFail(uuid, {
      relations: ['roles'],
    });

    return this.update(uuid, {
      roles: [...user.roles, ...roles],
    });
  }

  async detachRoles(uuid: string, roles: string[]) {
    const user = await this.usersRepository.findOneOrFail(uuid, {
      relations: ['roles'],
    });

    return this.update(uuid, {
      roles: user.roles.filter((e) => !roles.includes(e.name)),
    });
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
