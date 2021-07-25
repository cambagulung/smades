import { BaseEntity } from 'src/base-entity';
import { UserEntity } from 'src/auth/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CreateSessionDto } from '../dto/create-session.dto';

@Entity({ name: 'auth_sessions' })
export class SessionEntity extends BaseEntity<CreateSessionDto> {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

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
