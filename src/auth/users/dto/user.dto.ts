import { ApiProperty } from '@nestjs/swagger';
import { datatype, date, internet, name } from 'faker';
import { BaseDto } from 'src/base-dto';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends BaseDto<UserEntity> {
  @ApiProperty({ example: datatype.uuid() })
  readonly uuid: string;

  @ApiProperty({
    example: name.firstName() + ' ' + name.lastName(),
    description: 'nama lengkap pemilik akun',
  })
  readonly name: string;

  @ApiProperty({
    example: internet.email(),
    description: 'alamat email pemilik akun',
  })
  readonly email: string;

  @ApiProperty({ example: internet.userName(), description: 'nama pengguna' })
  readonly username: string;

  @ApiProperty({ example: date.past(), description: 'tanggal pembuatan akun' })
  readonly createdAt: string;

  @ApiProperty({
    example: date.past(),
    description: 'tanggal terakhir diupdate',
  })
  readonly updatedAt: string;

  readonly password?: string;

  get noPassword(): UserDto {
    return { ...this, password: undefined };
  }
}
