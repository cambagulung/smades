import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/auth/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/users/dto/update-user.dto';
import { UserEntity } from 'src/auth/users/entities/user.entity';
import { UsersService } from 'src/auth/users/users.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('api/v1/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  private async _findUserById(id: string): Promise<UserEntity> {
    try {
      return await this.usersService.findById(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.usersService.create(data);

    return user.noPassword;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    const user = await this._findUserById(id);

    this.usersService.update(user, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return this.usersService.remove(await this.usersService.findById(id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
