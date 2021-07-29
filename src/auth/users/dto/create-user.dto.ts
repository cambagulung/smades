import { IsNotEmpty, IsEmail, IsString, Validate } from 'class-validator';
import { UniqueRule } from '../rules/unique.rule';

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
