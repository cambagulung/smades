import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray } from 'class-validator';

export class AttachDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: ['publish article'] })
  readonly permissions: string[];
}
