import { IsNotEmpty, IsString } from 'class-validator';
import { IsExists } from 'src/validator/decorators/is-exists.decorator';
import { UserEntity } from '../users/entities/user.entity';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsExists(UserEntity)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
