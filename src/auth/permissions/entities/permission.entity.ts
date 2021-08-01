import { BaseEntity } from 'src/base-entity';
import { UserEntity } from 'src/auth/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { RoleEntity } from 'src/auth/roles/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'auth_permissions' })
export class PermissionEntity extends BaseEntity<CreatePermissionDto> {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @ManyToMany(() => UserEntity, (user) => user.permissions)
  users: UserEntity[];

  @ApiProperty()
  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}
