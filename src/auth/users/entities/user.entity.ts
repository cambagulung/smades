import { AbastractEntity } from 'src/abstract.entity';
import { PermissionEntity } from 'src/auth/permissions/entities/permission.entity';
import { RoleEntity } from 'src/auth/roles/entities/role.entity';
import { SessionEntity } from 'src/auth/sessions/entities/session.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'auth_users' })
export class UserEntity extends AbastractEntity {
  activeSession: SessionEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => SessionEntity, (session) => session.userId)
  sessions: SessionEntity[];

  @Column({ default: new Date().toISOString() })
  createdAt: Date;

  @Column({ default: new Date().toISOString() })
  updatedAt: Date;

  @ManyToMany(() => PermissionEntity, (permission) => permission.users)
  @JoinTable()
  permissions: PermissionEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];

  get noPassword(): this {
    return { ...this, password: undefined };
  }
}
