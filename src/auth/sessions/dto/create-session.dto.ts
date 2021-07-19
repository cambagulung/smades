import { IsNotEmpty, IsString, IsIP } from 'class-validator';
import { User } from 'src/auth/users/entities/user.entity';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  user: User;

  @IsString()
  @IsNotEmpty()
  device: string;

  @IsIP()
  @IsNotEmpty()
  ip: string;
}
