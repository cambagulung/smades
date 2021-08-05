import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';
import { internet, name } from 'faker';
import { IsUnique } from 'src/decorators/is-unique.decorator';
import { UserEntity } from '../entities/user.entity';

export const fakerGeneratedPassword = internet.password();

export class CreateUserRequestDto {
  @ApiProperty({ example: name.findName(), description: 'nama lengkap' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: internet.email(), description: 'alamat email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsUnique(UserEntity)
  readonly email: string;

  @ApiProperty({
    example: internet.userName(),
    description: 'nama pengguna, digunakan saat login atau memanggil',
  })
  @IsNotEmpty()
  @IsString()
  @IsUnique(UserEntity)
  readonly username: string;

  @ApiProperty({ example: fakerGeneratedPassword, description: 'katasandi' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
