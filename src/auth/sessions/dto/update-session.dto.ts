import { IsNotEmpty, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionDto } from './create-session.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  readonly lastSeen: Date;
}
