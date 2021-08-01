import {
  isString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import slugify from 'slugify';

import { EntityNotFoundError, EntityTarget, getRepository } from 'typeorm';

export function Slug<E>(
  target: EntityTarget<E>,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'Slug',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          if (!isString(value)) return false;

          Object.assign(args.object, {
            [args.property]: slugify(value, { lower: true }),
          });

          try {
            return !(await getRepository(target).findOneOrFail({
              where: { [args.property]: args.object[args.property] },
            }));
          } catch (e) {
            if (!(e instanceof EntityNotFoundError)) throw e;
          }

          return true;
        },

        defaultMessage(args: ValidationArguments) {
          if (!isString(args.value)) return '$property must be a string';

          return `$property "${
            args.object[args.property]
          }" must unique exactly`;
        },
      },
    });
  };
}
