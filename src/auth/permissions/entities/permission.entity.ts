import { UserEntity } from 'src/auth/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'auth_permissions' })
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.permissions)
  @JoinTable()
  users: UserEntity[];
}
