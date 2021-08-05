import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { datatype } from 'faker';
import { RoleDto } from 'src/auth/roles/dto/role.dto';
import { AttachDto } from './dto/attach.dto';

@ApiTags('users', 'users roles')
@Controller({ version: '1', path: 'users/:username/roles' })
export class RolesController {
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'mengabil daftar grup pengguna',
  })
  @ApiParam({
    name: 'username',
    example: 'lingu',
    description: 'username pengguna yang akan dicari',
  })
  @ApiOkResponse({
    isArray: true,
    type: RoleDto,
    description: 'daftar grup pengguna yang dimiliki pengguna',
  })
  @Get()
  async getRoles(@Param('username') username: string) {
    return username;
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'mengabil daftar grup pengguna',
  })
  @ApiParam({
    name: 'username',
    example: 'lingu',
    description: 'username pengguna yang akan dicari',
  })
  @ApiOkResponse({
    isArray: true,
    type: RoleDto,
    description: 'daftar grup yang dimiliki pengguna',
  })
  @Post()
  async attachRoles(
    @Param('username') username: string,
    @Body() attachDto: AttachDto,
  ) {
    return { username, attachDto };
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'mencabut grup dari pengguna',
  })
  @ApiParam({
    name: 'username',
    example: 'lingu',
    description: 'username pengguna yang akan dicari',
  })
  @ApiParam({
    name: 'roleUuid',
    example: datatype.uuid(),
    description: 'Uuid grup yang akan dicabut',
  })
  @ApiOkResponse({
    isArray: true,
    type: RoleDto,
    description: 'daftar grup pengguna yang dimiliki pengguna',
  })
  @Delete(':roleUuid')
  async detachRoles(
    @Param('username') username: string,
    @Param('roleUuid') roleUuid: string,
  ) {
    return { username, roleUuid };
  }
}
