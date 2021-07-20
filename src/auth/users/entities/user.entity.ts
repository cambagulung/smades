import { Action } from 'src/auth/action.enum';
import { Session } from 'src/auth/sessions/entities/session.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'auth_users' })
export class User extends BaseEntity {
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

  @OneToMany(() => Session, (session) => session.userId)
  sessions: Session[];

  @Column({ default: new Date().getTime() })
  createdAt: Date;

  @Column({ default: new Date().getTime() })
  updatedAt: Date;

  can(action: Action): boolean {
    return false;
  }
}
