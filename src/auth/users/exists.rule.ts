import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { UniqueRule } from './unique.rule';

@ValidatorConstraint({ name: 'UserPropertyExists', async: true })
export class ExistsRule extends UniqueRule {
  async validate(value: any, args: ValidationArguments) {
    return !super.validate(value, args);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} "${args.value}" doesn't exist`;
  }
}
