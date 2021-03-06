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
import { User } from 'src/http/decorators/user.decorator';
import { CreateUserDto } from 'src/auth/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/users/dto/update-user.dto';
import { UsersService } from 'src/auth/users/users.service';
import { EntityNotFoundError } from 'typeorm';

@Controller({ version: '1', path: 'article/articles' })
export class ArticlesApiController {
  constructor(private readonly usersService: UsersService) {}

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

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@User('uuid') userUuid: string, @Body() data: CreateUserDto) {
    const createable = await this.usersService.userCan(userUuid, 'create user');

    if (createable) return (await this.usersService.create(data)).noPassword;

    throw new ForbiddenException(
      'You dont have permissions to create new user',
    );
  }

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
