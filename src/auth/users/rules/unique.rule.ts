import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityNotFoundError } from 'typeorm';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'UserPropertyUnique', async: true })
export class UniqueRule implements ValidatorConstraintInterface {
  constructor(protected usersService: UsersService) {}

  async validate(value: any, args: ValidationArguments) {
    try {
      return !(await this.usersService.findOneByOptions({
        where: { [args.property]: value },
      }));
    } catch (e) {
      if (!(e instanceof EntityNotFoundError)) throw e;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} "${args.value}" has been used`;
  }
}
