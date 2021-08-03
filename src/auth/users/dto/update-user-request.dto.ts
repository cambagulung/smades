import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { datatype } from 'faker';
import {
  CreateUserRequestDto,
  fakerGeneratedPassword,
} from './create-user-request.dto';

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {
  @ApiProperty({
    example: fakerGeneratedPassword,
    description: 'kata sandi saat ini',
  })
  @IsNotEmpty()
  @IsString()
  readonly currentPassword: string;
}
