import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/auth/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/users/dto/update-user.dto';
import { UsersService } from 'src/auth/users/users.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('api/v1/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.usersService.create(data);

    return user.noPassword;
  }

  @Get(':uuid')
  async get(@Param('uuid') uuid: string) {
    try {
      return this.usersService.findOne(uuid, {
        relations: ['roles', 'permissions'],
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() data: UpdateUserDto) {
    try {
      this.usersService.update(uuid, data);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    try {
      return this.usersService.remove(uuid);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }
}
