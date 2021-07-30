import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { EntityNotFoundError, EntityTarget, getRepository } from 'typeorm';

export function IsUnique<E>(
  target: EntityTarget<E>,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(_value: any, args: ValidationArguments) {
          try {
            return !(await getRepository(target).findOneOrFail({
              where: { [args.property]: args.value },
            }));
          } catch (e) {
            if (!(e instanceof EntityNotFoundError)) throw e;
          }

          return true;
        },

        defaultMessage(args: ValidationArguments) {
          return `$property "${args.value}" must unique exactly`;
        },
      },
    });
  };
}
