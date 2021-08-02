import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsIP } from 'class-validator';
import { UserDto } from 'src/auth/users/dto/user.dto';

export class CreateSessionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly user: UserDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly device: string;

  @ApiProperty()
  @IsIP()
  @IsNotEmpty()
  readonly ip: string;
}
