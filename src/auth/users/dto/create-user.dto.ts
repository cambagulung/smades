import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';
import { internet, name } from 'faker';
import { IsUnique } from 'src/validator/decorators/is-unique.decorator';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  constructor(data?: Partial<CreateUserDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({ example: name.findName() })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: internet.email() })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsUnique(UserEntity)
  readonly email: string;

  @ApiProperty({ example: internet.userName() })
  @IsNotEmpty()
  @IsString()
  @IsUnique(UserEntity)
  readonly username: string;

  @ApiProperty({ example: internet.password() })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
