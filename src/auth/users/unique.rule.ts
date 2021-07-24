import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@ValidatorConstraint({ name: 'UserPropertyUnique', async: true })
export class UniqueRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UserEntity)
    protected usersRepository: Repository<UserEntity>,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    return !(await this.usersRepository.findOne({
      where: { [args.property]: value },
    }));
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} "${args.value}" has been used`;
  }
}
