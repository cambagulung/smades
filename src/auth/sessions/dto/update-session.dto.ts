import { IsNotEmpty, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
  @IsDate()
  @IsNotEmpty()
  readonly lastSeen: Date;
}
