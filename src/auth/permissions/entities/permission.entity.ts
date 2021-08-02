import { BaseEntity } from 'src/base-entity';
import { UserEntity } from 'src/auth/users/entities/user.entity';
import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { RoleEntity } from 'src/auth/roles/entities/role.entity';
import { datatype, lorem } from 'faker';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/auth/users/dto/user.dto';
import { RoleDto } from 'src/auth/roles/dto/role.dto';

@Entity({ name: 'auth_permissions' })
export class PermissionEntity extends BaseEntity<CreatePermissionDto> {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: datatype.uuid() })
  readonly uuid: string;

  @ApiProperty({ example: lorem.word() })
  readonly name: string;

  @ManyToMany(() => UserEntity, (user) => user.permissions)
  users: UserDto[];

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleDto[];
}
