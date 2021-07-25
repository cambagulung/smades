import { IsNotEmpty, IsString, IsIP } from 'class-validator';
import { UserEntity } from 'src/auth/users/entities/user.entity';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  readonly user: UserEntity;

  @IsString()
  @IsNotEmpty()
  readonly device: string;

  @IsIP()
  @IsNotEmpty()
  readonly ip: string;
}
