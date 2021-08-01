import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base-entity';
import { UserEntity } from 'src/auth/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CreateSessionDto } from '../dto/create-session.dto';

@Entity({ name: 'auth_sessions' })
export class SessionEntity extends BaseEntity<CreateSessionDto> {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty()
  @Column()
  device: string;

  @ApiProperty()
  @Column()
  ip: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user: UserEntity;

  @ApiProperty()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  lastSeen: Date;
}
