import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const pass = hashSync(createUserDto.password, genSaltSync(10));
    const user = new UserEntity({ ...createUserDto, password: pass });

    return this.usersRepository.save(user);
  }

  take({ take, page }: { take: number; page: number }): Promise<UserEntity[]> {
    const skip = page * take - take;

    return this.usersRepository.find({ take, skip });
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(uuid: string): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail(uuid);
  }

  findByUsername(username: string): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail({ username });
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail({ email });
  }

  async update(
    uuid: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findOne(uuid);

    if (updateUserDto.password) {
      const password = hashSync(updateUserDto.password, genSaltSync(10));

      Object.assign(updateUserDto, { password });
    }

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }

  async remove(uuid: string): Promise<UserEntity> {
    return this.usersRepository.remove(await this.findOne(uuid));
  }
}
