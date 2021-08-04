import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AttachDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: ['operator'] })
  readonly roles: string[];
}
