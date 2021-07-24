import { IsNotEmpty, IsString, IsIP } from 'class-validator';
import { UserEntity } from 'src/auth/users/entities/user.entity';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  user: UserEntity;

  @IsString()
  @IsNotEmpty()
  device: string;

  @IsIP()
  @IsNotEmpty()
  ip: string;
}
