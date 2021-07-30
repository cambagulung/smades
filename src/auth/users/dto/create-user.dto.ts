import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';
import { IsEqualTo } from 'src/validator/decorators/is-equal-to.decorator';
import { IsUnique } from 'src/validator/decorators/is-unique.decorator';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  constructor(data?: Partial<CreateUserDto>) {
    Object.assign(this, data);
  }

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsUnique(UserEntity)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsUnique(UserEntity)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsEqualTo('password')
  cPassword: string;
}
