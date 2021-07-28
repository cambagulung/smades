import { BaseEntity } from 'src/base-entity';
import { UserEntity } from 'src/auth/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { RoleEntity } from 'src/auth/roles/entities/role.entity';

@Entity({ name: 'auth_permissions' })
export class PermissionEntity extends BaseEntity<CreatePermissionDto> {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.permissions)
  users: UserEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}
