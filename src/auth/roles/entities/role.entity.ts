import { BaseEntity } from 'src/base-entity';
import { PermissionEntity } from 'src/auth/permissions/entities/permission.entity';
import { UserEntity } from 'src/auth/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'auth_roles' })
export class RoleEntity extends BaseEntity<CreateRoleDto> {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];

  @ApiProperty()
  @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  @JoinTable()
  permissions: PermissionEntity[];
}
