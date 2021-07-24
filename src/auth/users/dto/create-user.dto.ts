import { IsNotEmpty, IsEmail, IsString, Validate } from 'class-validator';
import { UniqueRule } from '../unique.rule';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Validate(UniqueRule)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Validate(UniqueRule)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
