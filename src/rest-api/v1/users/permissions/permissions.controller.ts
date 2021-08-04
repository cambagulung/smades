import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { datatype } from 'faker';
import { PermissionDto } from 'src/auth/permissions/dto/permission.dto';
import { AttachDto } from './dto/attach.dto';

@ApiTags('users', 'users permissions')
@Controller('api/v1/users/:username/permissions')
export class PermissionsController {
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'mengabil daftar hak akses pengguna',
  })
  @ApiParam({
    name: 'username',
    example: 'lingu',
    description: 'username pengguna yang akan dicari',
  })
  @ApiOkResponse({
    isArray: true,
    type: PermissionDto,
    description: 'daftar hak akses pengguna yang dimiliki pengguna',
  })
  @Get()
  async getPermissions(@Param('username') username: string) {
    return username;
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'mengabil daftar hak akses pengguna',
  })
  @ApiParam({
    name: 'username',
    example: 'lingu',
    description: 'username pengguna yang akan dicari',
  })
  @ApiOkResponse({
    isArray: true,
    type: PermissionDto,
    description: 'daftar hak akses pengguna yang dimiliki pengguna',
  })
  @Post()
  async attachPermissions(
    @Param('username') username: string,
    @Body() attachDto: AttachDto,
  ) {
    return { username, attachDto };
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'mencabut hak akses dari pengguna',
  })
  @ApiParam({
    name: 'username',
    example: 'lingu',
    description: 'username pengguna yang akan dicari',
  })
  @ApiParam({
    name: 'permissionUuid',
    example: datatype.uuid(),
    description: 'Uuid hak akses yang akan dicabut',
  })
  @ApiOkResponse({
    isArray: true,
    type: PermissionDto,
    description: 'daftar hak akses pengguna yang dimiliki pengguna',
  })
  @Delete(':permissionUuid')
  async detachPermissions(
    @Param('username') username: string,
    @Param('permissionUuid') permissionUuid: string,
  ) {
    return { username, permissionUuid };
  }
}
