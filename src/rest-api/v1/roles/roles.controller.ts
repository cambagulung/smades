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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateRoleDto } from 'src/auth/roles/dto/create-role.dto';
import { UpdateRoleDto } from 'src/auth/roles/dto/update-role.dto';
import { RolesService } from 'src/auth/roles/roles.service';
import { User } from 'src/auth/users/decorators/user.decorator';
import { UsersService } from 'src/auth/users/users.service';
import { EntityNotFoundError } from 'typeorm';

@Controller({ version: '1', path: 'roles' })
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
  ) {}

  @Get(':name')
  async get(@Param('name') name: string) {
    try {
      const role = await this.rolesService.findByName(name);

      return role;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@User('uuid') userUuid: string, @Body() data: CreateRoleDto) {
    const createable = await this.usersService.userCan(userUuid, 'create role');

    if (createable) return await this.rolesService.create(data);

    throw new ForbiddenException(
      'You dont have permissions to create new role',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':uuid')
  async update(
    @User('uuid') userUuid: string,
    @Param('uuid') uuid: string,
    @Body() data: UpdateRoleDto,
  ) {
    const updateable = await this.usersService.userCan(userUuid, 'update role');

    if (updateable || userUuid == uuid) {
      try {
        return await this.rolesService.update(uuid, data);
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          throw new NotFoundException(e.message);
        }

        throw e;
      }
    }

    throw new ForbiddenException(
      'You dont have permissions to update this role',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  async delete(@User('uuid') userUuid: string, @Param('uuid') uuid: string) {
    const deletable = this.usersService.userCan(userUuid, 'delete role');

    if (deletable && userUuid != uuid) {
      try {
        return await this.rolesService.remove(uuid);
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          throw new NotFoundException(e.message);
        }

        throw e;
      }
    }

    throw new ForbiddenException(
      'You dont have permissions to delete this role',
    );
  }
}
