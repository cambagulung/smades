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
import { JwtAuthGuard } from 'src/http/guards/jwt-auth.guard';
import { CreatePermissionDto } from 'src/auth/permissions/dto/create-permission.dto';
import { UpdatePermissionDto } from 'src/auth/permissions/dto/update-permission.dto';
import { PermissionsService } from 'src/auth/permissions/permissions.service';
import { User } from 'src/http/decorators/user.decorator';
import { UsersService } from 'src/auth/users/users.service';
import { EntityNotFoundError } from 'typeorm';

@Controller({ version: '1', path: 'permissions' })
export class PermissionsApiController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly usersService: UsersService,
  ) {}

  @Get(':name')
  async get(@Param('name') name: string) {
    try {
      const permission = await this.permissionsService.findByName(name);

      return permission;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @User('uuid') userUuid: string,
    @Body() data: CreatePermissionDto,
  ) {
    const createable = await this.usersService.userCan(
      userUuid,
      'create permission',
    );

    if (createable) return await this.permissionsService.create(data);

    throw new ForbiddenException(
      'You dont have permissions to create new permission',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':uuid')
  async update(
    @User('uuid') userUuid: string,
    @Param('uuid') uuid: string,
    @Body() data: UpdatePermissionDto,
  ) {
    const updateable = await this.usersService.userCan(
      userUuid,
      'update permission',
    );

    if (updateable || userUuid == uuid) {
      try {
        return await this.permissionsService.update(uuid, data);
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          throw new NotFoundException(e.message);
        }

        throw e;
      }
    }

    throw new ForbiddenException(
      'You dont have permissions to update this permission',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  async delete(@User('uuid') userUuid: string, @Param('uuid') uuid: string) {
    const deletable = this.usersService.userCan(userUuid, 'delete permission');

    if (deletable && userUuid != uuid) {
      try {
        return await this.permissionsService.remove(uuid);
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          throw new NotFoundException(e.message);
        }

        throw e;
      }
    }

    throw new ForbiddenException(
      'You dont have permissions to delete this permission',
    );
  }
}
