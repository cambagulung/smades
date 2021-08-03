import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionDto } from 'src/auth/permissions/dto/permission.dto';
import { RoleDto } from 'src/auth/roles/dto/role.dto';
import { User } from 'src/auth/users/decorators/user.decorator';
import { CreateUserDto } from 'src/auth/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/users/dto/update-user.dto';
import { UserDto } from 'src/auth/users/dto/user.dto';
import { UsersService } from 'src/auth/users/users.service';
import { EntityNotFoundError } from 'typeorm';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'mengabil data pengguna berdasarkan username' })
  @ApiParam({
    name: 'username',
    example: 'lingu',
    description: 'username pengguna yang akan dicari',
  })
  @ApiOkResponse({
    type: UserDto,
    description: 'data pengguna yang diperoleh dari username',
  })
  @Get(':username')
  async get(@Param('username') username: string) {
    try {
      const user = await this.usersService.findByUsername(username);

      return user.noPassword;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'mengabil daftar hak akses yang dimiliki pengguna pengguna',
  })
  @ApiParam({
    name: 'username',
    example: 'lingu',
    description: 'username pengguna yang akan dicari',
  })
  @ApiOkResponse({
    isArray: true,
    type: PermissionDto,
    description: 'daftar hak akses pengguna yang diperoleh dari username',
  })
  @Get(':username/permissions')
  async getPermissions(@Param('username') username: string) {
    //
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'mengabil daftar posisi pengguna',
  })
  @ApiParam({
    name: 'username',
    example: 'lingu',
    description: 'username pengguna yang akan dicari',
  })
  @ApiOkResponse({
    isArray: true,
    type: RoleDto,
    description: 'daftar posisi pengguna yang diperoleh dari username',
  })
  @Get(':username/roles')
  async getRoles(@Param('username') username: string) {
    //
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'mendaftarkan pengguna baru' })
  @ApiOkResponse({
    type: UserDto,
    description: 'data pengguna yang baru saja didaftarkan',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@User('uuid') userUuid: string, @Body() data: CreateUserDto) {
    const createable = await this.usersService.userCan(userUuid, 'create user');

    if (createable) return (await this.usersService.create(data)).noPassword;

    throw new ForbiddenException(
      'You dont have permissions to create new user',
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'memperbaharui data pengguna' })
  @ApiOkResponse({
    type: UserDto,
    description: 'data pengguna yang baru saja diperbaharui',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':uuid')
  async update(
    @User('uuid') authUuid: string,
    @Param('uuid') uuid: string,
    @Body() data: UpdateUserDto,
  ) {
    const updateable = await this.usersService.userCan(authUuid, 'update user');

    if (updateable || authUuid == uuid) {
      try {
        return (await this.usersService.update(uuid, data)).noPassword;
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          throw new NotFoundException(e.message);
        }

        throw e;
      }
    }

    throw new ForbiddenException(
      'You dont have permissions to update this user',
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'menghapus pengguna' })
  @ApiOkResponse({
    type: UserDto,
    description: 'data pengguna yang baru saja dihapus',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  async delete(@User('uuid') authUuid: string, @Param('uuid') uuid: string) {
    const deletable = this.usersService.userCan(authUuid, 'delete user');

    if (deletable && authUuid != uuid) {
      try {
        return (await this.usersService.remove(uuid)).noPassword;
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          throw new NotFoundException(e.message);
        }

        throw e;
      }
    }

    throw new ForbiddenException(
      'You dont have permissions to delete this user',
    );
  }
}
