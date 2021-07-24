import { UserEntity } from 'src/auth/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'auth_sessions' })
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  device: string;

  @Column()
  ip: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user: UserEntity;

  @Column({ default: new Date().toISOString() })
  createdAt: Date;

  @Column({ default: new Date().toISOString() })
  lastSeen: Date;
}
