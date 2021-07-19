import { User } from 'src/auth/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'auth_sessions' })
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  device: string;

  @Column()
  ip: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @Column({ default: new Date().getTime() })
  createdAt: Date;

  @Column({ default: new Date().getTime() })
  lastSeen: Date;
}
