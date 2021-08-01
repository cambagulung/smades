import { BaseEntity } from 'src/base-entity';
import { ArticleEntity } from 'src/article/articles/entities/article.entity';
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
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'auth_users' })
export class UserEntity extends BaseEntity<CreateUserDto> {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  @ApiProperty()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty()
  @Column({ nullable: true })
  updatedAt: Date;

  @ApiProperty()
  @OneToMany(() => ArticleEntity, (article) => article.user)
  articles: ArticleEntity[];

  @ApiProperty()
  @ManyToMany(() => PermissionEntity, (permission) => permission.users)
  @JoinTable()
  permissions: PermissionEntity[];

  @ApiProperty()
  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];

  get noPassword(): this {
    return { ...this, password: undefined };
  }
}
