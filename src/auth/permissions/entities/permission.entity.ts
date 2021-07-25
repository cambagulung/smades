import { BaseEntity } from 'src/base-entity';
import { UserEntity } from 'src/auth/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';

@Entity({ name: 'auth_permissions' })
export class PermissionEntity extends BaseEntity<CreatePermissionDto> {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.permissions)
  @JoinTable()
  users: UserEntity[];
}
