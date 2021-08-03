import { ApiProperty } from '@nestjs/swagger';
import { datatype, internet } from 'faker';
import { UserDto } from 'src/auth/users/dto/user.dto';
import { BaseDto } from 'src/base-dto';
import { SessionEntity } from '../entities/session.entity';

export class SessionDto extends BaseDto<SessionEntity> {
  constructor(data: SessionEntity) {
    super(data);

    if (data.user) Object.assign(this, { user: new UserDto(data.user) });
  }
  @ApiProperty({ example: datatype.uuid() })
  readonly uuid: string;

  @ApiProperty({ example: internet.userAgent() })
  readonly device: string;

  @ApiProperty({ example: internet.ipv6() + '::' + internet.ip() })
  readonly ip: string;
}
