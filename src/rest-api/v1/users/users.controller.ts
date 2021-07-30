import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from 'src/auth/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/users/dto/update-user.dto';
import { UsersService } from 'src/auth/users/users.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('api/v1/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
  async create(@Body() data: CreateUserDto) {
    const user = await this.usersService.create(data);

    return user.noPassword;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() data: UpdateUserDto) {
    try {
      const user = await this.usersService.update(uuid, data);

      return user.noPassword;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    try {
      const user = await this.usersService.remove(uuid);

      return user.noPassword;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }
}
