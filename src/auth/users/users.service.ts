import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { Repository, UpdateResult } from 'typeorm';
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
    const user = new UserEntity();
    const pass = hashSync(createUserDto.password, 10);

    Object.assign(user, { ...createUserDto, password: pass });

    return this.usersRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail(id);
  }

  findByUsername(username: string): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail({ where: { username } });
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail({ where: { email } });
  }

  update(user: UserEntity, data: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(user, data);
  }

  remove(user: UserEntity): Promise<UserEntity> {
    return this.usersRepository.remove(user);
  }
}
