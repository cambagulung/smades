import { PermissionEntity } from 'src/auth/permissions/entities/permission.entity';
import { UserEntity } from 'src/auth/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'auth_roles' })
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  @JoinTable()
  users: UserEntity[];

  @ManyToMany(() => PermissionEntity, (permission) => permission.users)
  @JoinTable()
  permissions: PermissionEntity[];
}
