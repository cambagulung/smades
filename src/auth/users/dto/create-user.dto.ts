import { IsNotEmpty, IsEmail, IsString, Validate } from 'class-validator';
import { UniqueRule } from '../unique.rule';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Validate(UniqueRule)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Validate(UniqueRule)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
